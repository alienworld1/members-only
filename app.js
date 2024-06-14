const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

mongoose.connect(process.env.MONGODB_URL);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
