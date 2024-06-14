const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  status: {
    type: String,
    default: 'External',
    enum: ['External', 'Member', 'Admin'],
  },
});

module.exports = mongoose.model('User', userSchema);
