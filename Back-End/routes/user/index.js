const express = require('express');
const router = express.Router();
const userController = require('../../controller/user');
const passport = require('passport');

router.get('/login', userController.github);

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/', session: false }), //failureRedirect 수정 필요
    userController.login
);

router.get('/logout', userController.logout);

module.exports = router;
