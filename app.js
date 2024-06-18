const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

require('dotenv').config();

const User = require('./models/user');
const indexRouter = require('./routes/index');
const messageRouter = require('./routes/messages');
const adminRouter = require('./routes/admin');
const { isUser, isMember } = require('./middleware/auth');

const app = express();

mongoose.connect(process.env.MONGODB_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    collectionName: 'sessions',
    client: mongoose.connection.getClient(),
  }),
}));

app.use(passport.session());
app.use(passport.authenticate('session'));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({username: username}).exec();
      if (!user) {
        return done(null, false, {message: 'This user does not exist.'});
      }

      const verifyPassword = await bcrypt.compare(password, user.password);

      if (!verifyPassword) {
        return done(null, false, {message: 'Incorrect password'});
      }

      return done(null, user);

    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/messages', isUser, messageRouter);
app.use('/admin', isUser, isMember, adminRouter);

app.use((req, res, next) =>  next(createError(404)));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};

  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));

//TODO: minify tailwind in production
