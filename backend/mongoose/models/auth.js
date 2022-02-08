const mongoose = require('mongoose');

// schema for Registering/Validating the user
const authSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      Date.now();
    },
  },
});

export default mongoose.models.auth || mongoose.model('auth', authSchema);
