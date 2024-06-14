const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

const User = require('../models/user');

exports.sign_up_get = asyncHandler(async(req, res) => {
  res.render('sign-up-form', {title: 'Sign up'});
});

exports.sign_up_post = [
  body('first_name', 'The first name must be specified')
    .isLength({min: 1}),
  body('last_name', 'The last name must be specified')
    .isLength({min: 1}),
  body('username')
    .trim()
    .isLength({min: 1, max: 16})
    .withMessage('The username must have 1-16 characters.')
    .custom(async value => {
      const userExists = await User.exists({username: value}).exec();
      if (userExists) {
        throw new Error('The username is already in use.');
      }
    })
    .escape(),
  body('password', 'The password must have 6-32 characters.')
    .isLength({min: 6, max: 32}),
  body('confirm_password')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('The password and password confirmation must match.'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const user = new User({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res.render('sign-up-form', {
        title: 'Sign up',
        user: user,
        errors: errors.array(),
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();

    res.redirect('/');
  }),
];