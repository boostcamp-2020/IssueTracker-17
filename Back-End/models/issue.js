module.exports = (sequelize, Datatypes) => {
    const issue = sequelize.define(
        'issue',
        {
            user_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            milestone_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: Datatypes.STRING(500),
                allowNull: false,
            },
            contents: {
                type: Datatypes.STRING(4000),
                allowNull: false,
            },
            status: {
                type: Datatypes.INTEGER,
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

    issue.associate = (models) => {
        models.issue.hasMany(models.comment, {
            foreignKey: 'issue_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.issue.hasMany(models.has_assignee, {
            foreignKey: 'issue_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.issue.hasMany(models.has_label, {
            foreignKey: 'issue_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.issue.belongsTo(models.milestone, {
            foreignKey: 'milestone_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.issue.belongsTo(models.user, {
            foreignKey: 'user_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return issue;
};
