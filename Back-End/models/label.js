module.exports = (sequelize, Datatypes) => {
    const label = sequelize.define(
        'label',
        {
            title: {
                type: Datatypes.STRING(500),
                allowNull: false,
            },
            contents: {
                type: Datatypes.STRING(2000),
                allowNull: false,
            },
            color: {
                type: Datatypes.STRING(200),
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    label.associate = (models) => {
        models.label.hasMany(models.has_label, {
            foreignKey: 'label_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };
    label.get = async (id) => {
        const query = {
            raw: true,
        };
        if (id) query.where = { id };
        return await label.findAll(query);
    };

    label.insert = async ({ title, contents, color }) => {
        const result = await label.create({
            title: title,
            contents: contents,
            color: color,
        });
        return result;
    };

    label.change = async ({ id, title, contents, color }) => {
        const result = await label.update(
            {
                title: title,
                contents: contents,
                color: color,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        return result[0];
    };

    label.delete = async ({ id }) => {
        const result = await label.destroy({
            where: {
                id: id,
            },
        });
        return result;
    };

    return label;
};
