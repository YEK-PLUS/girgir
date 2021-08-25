const express = require('express');
const logger = require('morgan');
const girgir = require('girgir');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(girgir({}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
