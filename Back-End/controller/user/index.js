const passport = require('passport');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

function userController() {}

userController.github = passport.authenticate('github');

userController.login = (req, res) => {
    const payload = req.user;
    jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
        res.json({ token: token });
    });
};

module.exports = userController;
