module.exports = (sequelize, DataTypes) => {
    var restaurants = sequelize.define('Restaurants', {
        register_id: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        name : {
            type: DataTypes.STRING(30),
            allowNull : false,
        },
        address : {
            type: DataTypes.STRING(30),
            allowNull : false,
        },
        phone_num : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        introduction : {
            type: DataTypes.STRING(200),
            allowNull : true,
        },
        latitude : {
            type: DataTypes.DOUBLE,
            allowNull : false,
        },
        longitude : {
            type: DataTypes.DOUBLE,
            allowNull : false,
        },
        seller_id : {
            type : DataTypes.STRING(30),
            allowNull : false,
            // references: {model: db.seller, key: 'username'}
        }
    });

    restaurants.associate = function(models){
        restaurants.belongsTo(models.Seller, {
            foreignKey: "seller_id",
            onDelete: 'cascade'
        })
    };      
    return restaurants;
}
