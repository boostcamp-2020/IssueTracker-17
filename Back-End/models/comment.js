module.exports = (sequelize, Datatypes) => {
    const comment = sequelize.define(
        'comment',
        {
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            issue_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            contents: {
                type: Datatypes.STRING(1000),
                allowNull: false,
            },
            emoji: {
                type: Datatypes.STRING(1000),
                allowNull: false,
            },
            created: {
                type: Datatypes.DATE,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    comment.associate = (models) => {
        models.comment.belongsTo(models.user, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.comment.belongsTo(models.issue, {
            foreignKey: 'issue_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return comment;
};
