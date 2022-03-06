import dbConnect from './mongodb';
import auth from './models/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
  } catch (e) {
    console.error(e);
    res.send('database connection error');
  }

  if (req.method == 'GET') {
    try {
      let user = await auth.find({ wallet_address: req.query.wallet_address });
      return res.json({
        message: JSON.parse(JSON.stringify(user)),
        success: true,
      });
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  } else if (req.method == 'POST') {
    try {
      const body = JSON.parse(req.body);
      await auth.create({
        wallet_address: body.wallet_address,
        username: body.username,
        nickname: body.nickname,
      });
      return res.json({
        message: 'Post added successfully',
        success: true,
      });
    } catch (error: any) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  } else {
    res.status(200).json({ error: 'Wrong route fetching' });
  }
}
