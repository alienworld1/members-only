const asyncHandler = require('express-async-handler');

exports.messages_get = asyncHandler(async(req, res) => {
  res.render('messages', {title: 'Messages'});
});