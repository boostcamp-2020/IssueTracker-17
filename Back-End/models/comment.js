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
    comment.get = async ({ issueId }) => {
        return await comment.findAll({ where: { issue_id: issueId } });
    };

    comment.insert = async ({ issueId, contents, created, emoji, userId }) => {
        const result = await comment.create(
            {
                issue_id: issueId,
                contents: contents,
                created: created,
                emoji: emoji,
                user_id: userId,
            },
            { where: { issueId } }
        );
        return result;
    };

    comment.change = async ({ id, contents, created, emoji }) => {
        const result = await comment.update(
            {
                contents,
                created,
                emoji,
            },
            {
                where: { id },
            }
        );
        return result;
    };

    return comment;
};
