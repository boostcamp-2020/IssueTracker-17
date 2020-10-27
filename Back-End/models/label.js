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

    return label;
};
