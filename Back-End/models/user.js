module.exports = (sequelize, Datatypes) => {
    const user = sequelize.define(
        'user',
        {
            type: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            identifier: {
                type: Datatypes.STRING(300),
                allowNull: false,
            },
            name: {
                type: Datatypes.STRING(120),
                allowNull: false,
            },
            profile_url: {
                type: Datatypes.STRING(1000),
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    user.associate = (models) => {
        models.user.hasMany(models.comment, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.user.hasMany(models.issue, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.user.hasMany(models.has_assignee, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return user;
};
