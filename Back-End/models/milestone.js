module.exports = (sequelize, Datatypes) => {
    const milestone = sequelize.define(
        'milestone',
        {
            title: {
                type: Datatypes.STRING(500),
                allowNull: false,
            },
            content: {
                type: Datatypes.STRING(2000),
                allowNull: false,
            },
            until: {
                type: Datatypes.DATE,
                allowNull: false,
            },
            status: {
                type: Datatypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );

    milestone.associate = (models) => {
        models.milestone.hasMany(models.issue, {
            foreignKey: 'milestone_id',
            sourceKey: 'id',
            onDelete: 'cascade',
        });
    };

    return milestone;
};
