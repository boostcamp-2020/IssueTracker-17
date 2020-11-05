const passport = require('passport');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');
const { user } = require('../../models/sequelize');
const loginTypes = require('../../config/logintypes');

function userController() {}

userController.github = passport.authenticate('github');

userController.iosLogin = async (req, res) => {
    console.log(req.body);
    const { identifier, name, profileUrl, type } = req.body;
    if (!identifier) {
        res.status(401).json({ login: false });
    }

    const result = await user.findOne({
        where: { identifier: identifier, type: type },
    });

    let payload = { type: type, identifier: identifier };
    let fields = ['type', 'identifier'];
    if (type == loginTypes.GITHUB) {
        payload.name = name;
        payload.profile_url = profileUrl;
        fields = [...fields, 'name', 'profile_url'];
    }

    console.log(payload);
    if (!result) {
        await user.create(payload, {
            fields: fields,
        });
    }

    jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
        res.json({ token: token });
    });
};

userController.login = (req, res) => {
    const payload = req.user;
    jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
        res.json({ token: token });
    });
};

userController.getUsers = async (req, res) => {
    const users = await user.findAll();
    res.status(200).json(JSON.stringify(users));
};

module.exports = userController;
