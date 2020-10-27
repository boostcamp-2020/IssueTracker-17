const passport = require('passport');

const passportGithub = require('passport-github2');
const User = require('../models/user');
const GitHubStrategy = passportGithub.Strategy;

const config = require('../config/config');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(
        new GitHubStrategy(
            {
                clientID: config.githubOAuthID,
                clientSecret: config.githubOAuthSecret,
                callbackURL: config.callbackURL,
            },
            async (accessToken, refreshToken, profile, done) => {
                const {
                    _json: { login, id, avatar_url },
                } = profile;
                const user = await User.findOne({ where: { identifier: id } });
                if (user) {
                    return done(null, user.dataValues);
                }
                const newUser = await User.create(
                    {
                        identifier: id,
                        name: login,
                        profile_url: avatar_url,
                        type: 1,
                    },
                    { fields: ['identifier', 'name', 'profile_url', 'type'] }
                );
                return done(null, newUser.dataValues);
            }
        )
    );
};
