const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authentication = async (req, res, next) => {
    const { token } = req.Authorization;
    const secret = config.jwtSecret;
    const unauthorized = {
        status: 401,
        name: 'Unauthorized',
        message: '사용자 인증 실패',
    };

    // if (!token) {
    //     return res.json({ message: '로그인이 필요합니다' });
    // }

    try {
        const { id } = jwt.verify(token, secret);
        const user = await User.findOne({ where: { identifier: id } });
        if (!user) {
            return res.status(401).json(unauthorized);
        }
        res.locals.user = user.dataValues;
    } catch (err) {
        return res.status(401).json(unauthorized);
    }
    next();
};
