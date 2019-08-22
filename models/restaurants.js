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
        category : {
            type: DataTypes.ENUM('koreanFood','chineseFood','japaneseFood','snack','chicken','pizza','midnightSnack','fastFood'),
            allowNull : false,
        },
        seller_id : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    });

    return restaurants;
}
