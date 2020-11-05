const passport = require('passport');

const passportGithub = require('passport-github2');
const { user } = require('@models/sequelize');
const GitHubStrategy = passportGithub.Strategy;

const config = require('@config/config');
const loginTypes = require('@config/logintypes');

const githubStrategyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
) => {
    const {
        _json: { login, id, avatar_url },
    } = profile;
    const result = await user.findOne({
        where: { identifier: id, type: loginTypes.GITHUB },
    });
    if (result) {
        return done(null, result.dataValues);
    }
    const newUser = await user.create(
        {
            identifier: id,
            name: login,
            profile_url: avatar_url,
            type: loginTypes.GITHUB,
        },
        { fields: ['identifier', 'name', 'profile_url', 'type'] }
    );
    return done(null, newUser.dataValues);
};

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
            githubStrategyCallback
        )
    );
};
