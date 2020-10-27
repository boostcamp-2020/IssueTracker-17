module.exports = (sequelize, Datatypes) => {
    const has_assignee = sequelize.define(
        'has_assignee',
        {
            issue_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    has_assignee.associate = (models) => {
        models.has_assignee.belongsTo(models.user, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.has_assignee.belongsTo(models.issue, {
            foreignKey: 'issue_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return has_assignee;
};
