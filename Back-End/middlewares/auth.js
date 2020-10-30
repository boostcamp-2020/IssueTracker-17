const { user } = require('../../models/sequelize');
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
        const result = await user.findOne({ where: { identifier: id } });
        if (!result) {
            return res.status(401).json(unauthorized);
        }
        res.locals.user = result.dataValues;
    } catch (err) {
        return res.status(401).json(unauthorized);
    }
    next();
};
