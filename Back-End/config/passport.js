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
    })
    passport.use(new GitHubStrategy({
        clientID: config.githubOAuthID,
        clientSecret: config.githubOAuthSecret,
        callbackURL: "http://localhost:3000/users/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            const { _json: {login, id}} = profile;
            const user = await User.findOne({where: {id: id}});
            if(user){
                return done(null, user.dataValues);
            }
            const newUser = await User.create({
                id: id,
                nickname: login
            },{fields: ['id', 'nickname']});
            return done(null, newUser.dataValues);
        }
    ));
}