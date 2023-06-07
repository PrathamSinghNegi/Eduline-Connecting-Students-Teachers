const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  appointments: [
    {
      educator: {
        type: Schema.Types.ObjectId,
        ref: "educators",
      },
      bookingId: {
        type: Number,
      },
      studentname: {
        type: String,
        required: true,
      },
      status: {
        type: String,
      },
      age: {
        type: Number,
      },
      date: {
        type: Date,
      },
      description: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
