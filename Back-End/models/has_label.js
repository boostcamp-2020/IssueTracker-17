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

    return has_label;
};
