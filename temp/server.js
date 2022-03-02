require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

const url = process.env.DB_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const db = mongoose.connection;
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const authSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      required: true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    username: {
      type: String,
      immutable: true,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const user = new mongoose.model('user', authSchema);

app.get('/users/', function (req, res) {
  console.log(req.body.wallet_address);
  user.findOne(
    { wallet_address: req.body.wallet_address },
    function (err, founduser) {
      if (founduser) {
        res.send(founduser);
      } else {
        res.send(err);
      }
    }
  );
});

app.route('/users').post(function (req, res) {
  user.findOne(
    { wallet_address: req.body.wallet_address },
    function (err, found) {
      if (err) {
        console.log(err);
      } else {
        if (found) {
          if (found.wallet_address === wallet_address) {
            console.log('Already a registered user');
            res.send(found);
          }
        } else {
          console.log(req.files);
          if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded');
          }
          var pp = req.files.image;
          pp.mv('userImages/' + req.body.username, function (err) {
            if (err) {
              res.json({ error: 'File not saved' });
            } else {
            }
          });
          console.log(pp);
          const newuser = new user({
            wallet_address: req.body.wallet_address,
            image: req.body.username,
            username: req.body.username,
            nickname: req.body.nickname,
          });

          newuser.save(function (err) {
            if (!err) {
              res.send('successfully registered new user');
              console.log('successfully registered new user');
            } else {
              res.send(err);
            }
          });
        }
      }
    }
  );
});

app.listen(9000, function () {
  console.log('Temporary Dodging Turtis server running');
});
