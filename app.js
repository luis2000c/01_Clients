var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var permissionsRouter = require('./routes/permissions');
var rolesRouter = require('./routes/roles');

var app = express();

app.use(logger('dev'));
app.use(express.json());//Permite receptar peticiones con el verbo post
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/user/change-password');
app.use('/roles',rolesRouter);
app.use('/permissions',permissionsRouter);

module.exports = app;
