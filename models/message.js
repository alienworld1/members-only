const mongoose = require('mongoose');
const DateTime = require('luxon').DateTime;

const messageSchema = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  timestamp: {type: Date, required: true},
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

messageSchema.virtual('formatted_timestamp').get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Message', messageSchema);
