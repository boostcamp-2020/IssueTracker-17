module.exports = (sequelize, Datatypes) => {
    const has_label = sequelize.define(
        'has_label',
        {
            issue_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
            label_id: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    has_label.associate = (models) => {
        models.has_label.belongsTo(models.label, {
            foreignKey: 'label_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
        models.has_label.belongsTo(models.issue, {
            foreignKey: 'issue_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    has_label.get = async ({ issueId, model }) => {
        const result = await has_label.findAll({
            raw: true,
            include: [
                {
                    model: model.label,
                    attributes: [],
                },
            ],
            where: {
                issue_id: issueId,
            },
            attributes: ['label.title', 'label.contents', 'label.color'],
        });
        return result;
    };

    has_label.insert = async ({ list }) => {
        const result = await has_label.bulkCreate(list);
        return result;
    };

    has_label.change = async ({ id, issueId, labelId }) => {
        const result = await has_label.update(
            {
                issue_id: issueId,
                label_id: labelId,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        return result[0];
    };

    return has_label;
};
