const mongoose = require('mongoose');
import { isEmail } from 'validator';

// schema for Registering/Validating the user
const authSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, 'Please fill a valid email address'],
  },
  wallet_address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      Date.now();
    },
  },
});

export default mongoose.models.auth || mongoose.model('auth', authSchema);
