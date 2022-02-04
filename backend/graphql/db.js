const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log(err));
  } catch (e) {
    console.error(`Error : ${e.message}`);
    process.exit(1);
  }
};

export default connectDB;
