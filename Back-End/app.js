require('module-alias/register');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport');
const { sequelize } = require('./models/sequelize');
const cors = require('cors');

const userRouter = require('./routes/user');
const labelRouter = require('./routes/label');
const milestoneRouter = require('./routes/milestone');
const issueRouter = require('./routes/issue');
const assigneeRouter = require('./routes/has_assignee');
const commentRouter = require('./routes/comment');
const hasLabelRouter = require('./routes/has_label');
const imgRouter = require('./routes/img');

const corsOption = {
    origin: 'http://localhost:8080', // 허락하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

const app = express();
app.use(cors(corsOption)); // CORS 미들웨어 추가

sequelize.sync();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
passportConfig();

app.set('view engine', 'html');

app.use('/user', userRouter);
app.use('/label', labelRouter);
app.use('/milestone', milestoneRouter);
app.use('/issue', issueRouter);
app.use('/assignee', assigneeRouter);
app.use('/comment', commentRouter);
app.use('/has-label', hasLabelRouter);
app.use('/imageUpload', imgRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err.message);
    res.status(err.status || 500);
    res.json({ result: err.message });
});

module.exports = app;
