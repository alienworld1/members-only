const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Message = require('../models/message');

exports.messages_get = asyncHandler(async(req, res) => {
  res.render('messages', {title: 'Messages'});
});

exports.messages_create_get = asyncHandler(async(req, res) => {
  res.render('message_form', {title: 'Post a Message'});
});

exports.messages_create_post = [
  body('title', 'The title must be specified')
    .trim()
    .isLength({min: 1})
    .escape(),
  body('text', 'The message length must be between 1-280 characters')
    .trim()
    .isLength({min: 1, max: 280})
    .escape(),
  
  asyncHandler(async(req, res) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user.id,
      timestamp: new Date(),
    });

    if (!errors.isEmpty()) {
      res.render('message_form', {
        title: 'Post a Message',
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect('/messages');
    }
  })
];
