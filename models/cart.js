module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Cart', {
        food: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        cost : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        user_id : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        restaurant_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
     
    },
        
    );
}
