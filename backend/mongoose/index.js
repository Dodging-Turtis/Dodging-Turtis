const ObjectId = require('mongodb').ObjectId;
import dbConnect from '../../lib/mongodb';
const mongoose = require('mongoose');
import auth from './models/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method == 'GET') {
    try {
      let user = await auth.find({ wallet_address: req.body.wallet_address });

      return res.json({
        message: JSON.parse(JSON.stringify(user)),
        success: true,
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  } else if (req.method == 'POST') {
    try {
      await auth.create({
        wallet_address: req.body.wallet_address,
        username: req.body.username,
        nickname: req.body.nickname,
      });

      return res.json({
        message: 'Post added successfully',
        success: true,
      });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  } else {
    res.status(200).json({ error: 'Wrong route fetching' });
  }
}
