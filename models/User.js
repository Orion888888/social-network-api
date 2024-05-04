const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
