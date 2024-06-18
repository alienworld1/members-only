const asyncHandler = require('express-async-handler');

exports.messages_get = asyncHandler(async(req, res) => {
  res.render('messages', {title: 'Messages'});
});

exports.messages_create_get = asyncHandler(async(req, res) => {
  res.render('message_form', {title: 'Write a Message'});
});