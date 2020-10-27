const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport');
const { sequelize } = require('./models/sequelize');

const userRouter = require('./routes/user');
const labelRouter = require('./routes/label');
const milestoneRouter = require('./routes/milestone');
const issueRouter = require('./routes/issue');

const app = express();

sequelize.sync();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
passportConfig();

app.set('view engine', 'html');

app.use('/user', userRouter);
app.use('/label', labelRouter);
app.use('/milestone', milestoneRouter);
app.use('/issue', issueRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
