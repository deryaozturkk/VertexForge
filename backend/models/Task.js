export default (sequelize, DataTypes) => {
    const Task = sequelize.define("task", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['to-do', 'in progress', 'done'],
            allowNull: false
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'lists',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    });

    Task.associate = (models) => {
        Task.belongsTo(models.list, {
            foreignKey: 'listId',
            as: 'list'
        });
    };

    return Task;
}
