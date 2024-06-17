const asyncHandler = require('express-async-handler');

exports.posts_get = asyncHandler(async(req, res) => {
  res.render('index', {title: 'Posts'});
});