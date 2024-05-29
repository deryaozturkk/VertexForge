export default (sequelize, DataTypes) => {
    const List = sequelize.define("list", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    List.associate = (models) => {
        List.hasMany(models.task, {
            foreignKey: 'listId',
            as: 'tasks'
        });
    };

    return List;
}
