require('dotenv').config();
const config = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    githubOAuthID: process.env.githubOAuthID,
    githubOAuthSecret: process.env.githubOAuthSecret,
};

module.exports = config;
