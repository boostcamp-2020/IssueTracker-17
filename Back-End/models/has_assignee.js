const { Op } = require('sequelize');

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

    has_assignee.get = async ({ issueId, model }) => {
        const result = await has_assignee.findAll({
            raw: true,
            include: [
                {
                    model: model.user,
                },
            ],
            where: {
                issue_id: issueId,
            },
        });
        return result;
    };

    has_assignee.delete = async ({ issueId, deleteAssignees }) => {
        const result = await has_assignee.destroy({
            where: {
                issue_id: issueId,
                user_id: {
                    [Op.or]: deleteAssignees,
                },
            },
        });
        console.log(result);
        return result;
    };

    return has_assignee;
};
