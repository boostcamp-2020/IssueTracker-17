const {encryptedPassword, comparePassword} = require('../../utils/bcrypt');

module.exports = (sequelize, Datatypes) =>{
    const user = sequelize.define('user', {
        email : {
            type : Datatypes.STRING(120),
            allowNull : false
        },
        pw : {
            type : Datatypes.STRING(300),
            allowNull : false
        }
    }, {
        timestamps : false
    });

    user.associate = (models)=>{
        models.user.hasMany(models.transaction,{foreignKey : 'user_id',sourceKey:'id',onDelete: 'cascade'});
    }

    return user;
}