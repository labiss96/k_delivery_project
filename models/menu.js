module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Menu', {
        food: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        cost : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        restaurant_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
     
    },
        
    );
}