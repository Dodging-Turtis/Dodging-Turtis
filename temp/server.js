require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

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

app.get('/users/:wallet_address', function (req, res) {
  console.log(req.params.wallet_address);
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

app.route('/users/:wallet_address').post(function (req, res) {
  user.findOne(
    { wallet_address: req.params.wallet_address },
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
          console.log(req.body.wallet_address);
          const newuser = new user({
            wallet_address: req.body.wallet_address,
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
