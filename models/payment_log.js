module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Payment_log', {
        food: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        cost : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        customer_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
        seller_id : {
            type : DataTypes.INTEGER,
            allowNull : true,
            
        }
     
    },
        
    );
}
