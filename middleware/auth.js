exports.isUser = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/not-registered');
  }
}

exports.isMember = async (req, res, next) => {
  // The isUser middleware should be used prior to using this method
  if (req.user.status === 'External') {
    res.redirect('/join-the-club');
  } else {
    next();
  }
}
