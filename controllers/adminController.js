const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Message = require('../models/message');

exports.admin_form_get = asyncHandler(async(req, res) => {
  if (req.user.status === 'Admin') {
    res.redirect('/messages');
  } else {
    res.render('admin-form', {title: 'Become an Admin'});
  }
});

exports.admin_form_post = asyncHandler(async(req, res) => {
  if (req.user.status === 'Admin') {
    res.redirect('/messages');
    return;
  }
  
  if (req.body.passkey != process.env.ADMIN_PASSKEY) {
    res.render('admin-form', {title: 'Become an Admin', error: true});
    return;  
  }

  req.user = await User.findByIdAndUpdate(req.user.id, {status: 'Admin'});
  res.redirect('/messages');
});

exports.admin_message_delete = asyncHandler(async(req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (message === null) {
    const error = new Error('Message not found');
    error.status = 404;
    return next(error);
  }

  await Message.findByIdAndDelete(message.id);
  res.redirect('/messages');
})