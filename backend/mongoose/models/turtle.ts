import mongoose from 'mongoose';

//schema for for getting high score of a every turtle owned by particular user
const turtleSchema = new mongoose.Schema({
  username: {
    type: String,
    immutable: true,
    required: true,
  },
  turtles: [
    {
      id: {
        type: String,
        required: 'Error: turtle identifier (uri)',
      },
      highScore: {
        type: Number,
        required: 'Error: turtle high score',
      },
    },
  ],
  updatedAt: {
    type: Date,
    immutable: false,
    default: () => {
      Date.now();
    },
  },
});

export default mongoose.models.auth || mongoose.model('turtle', turtleSchema);
