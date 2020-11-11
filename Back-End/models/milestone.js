module.exports = (sequelize, Datatypes) => {
    const milestone = sequelize.define(
        'milestone',
        {
            title: {
                type: Datatypes.STRING(500),
                allowNull: false,
            },
            contents: {
                type: Datatypes.STRING(2000),
                allowNull: true,
            },
            until: {
                type: Datatypes.DATE,
                allowNull: true,
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
