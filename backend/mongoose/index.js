const mongoose = require('mongoose');
const multer = require('multer');

import './db';
const auth = require('./models/auth');
const turtle = require('./models/turtle');
const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

app
  .route('/user')
  .get(function (req, res) {
    auth.find(
      { wallet_address: req.body.wallet_address },
      function (err, found) {
        if (err) {
          res.send('user not found');
        } else {
          res.send(found);
        }
      }
    );
  })
  .post(upload.single('avatar'), function (req, res) {
    const new_user = new auth({
      wallet_address: req.body.wallet_address,
      img: {
        data: fs.readFileSync(
          path.join(__dirname + '/uploads/' + req.file.filename)
        ),
        contentType: 'image/png',
      },
      username: req.body.username,
      nickname: req.body.nickname,
    });

    new_user.save(function (err) {
      if (!err) {
        res.send('you are successfully registered');
      } else {
        res.send(err);
      }
    });
  });

export default async function handler(req, res) {
  res.status(404).json({ dev: 'Dodging Turtis v2.0' });
}
