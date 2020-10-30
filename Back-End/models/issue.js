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
                allowNull: true,
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

    issue.get = async ({ model }) => {
        const result = await issue.findAll({
            include: [
                {
                    model: model.user,
                    attributes: ['name'],
                },
                {
                    model: model.milestone,
                    attributes: ['title'],
                },
                {
                    model: model.has_label,
                    attributes: {
                        exclude: ['id', 'issue_id'],
                    },
                    include: [
                        {
                            model: model.label,
                        },
                    ],
                },
                {
                    model: model.has_assignee,
                    attributes: {
                        exclude: ['id', 'issue_id'],
                    },
                    include: [
                        {
                            model: model.user,
                        },
                    ],
                },
            ],
            attributes: ['id', 'title', 'status', 'contents', 'created'],
        });
        return result;
    };

    issue.insert = async ({
        userId,
        milestoneId = null,
        title,
        contents,
        created,
        status,
    }) => {
        const result = await issue.create({
            user_id: userId,
            milestone_id: milestoneId,
            title: title,
            contents: contents,
            created: created,
            status: status,
        });
        return result;
    };

    return issue;
};
