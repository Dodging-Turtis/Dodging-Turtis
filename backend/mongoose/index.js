const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
import './db';
const auth = require('./models/auth');
const turtle = require('./models/turtle');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

var upload = multer({ storage: storage });

export default async function handler(req, res) {
  res.status(404).json({ dev: 'Dodging Turtis v2.0' });
  if (req.method == 'GET') {
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
  } else if (req.method == 'POST') {
    upload.single('avatar');
    const new_user = new auth({
      wallet_address: req.body.wallet_address,
      img: req.body.img,
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
  } else {
    res.status(200).json({ error: 'Wrong route fetching' });
  }
}
