module.exports = (sequelize, DataTypes) => {
    var seller = sequelize.define('Seller', {
        username: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        password : {
            type: DataTypes.STRING(30),
            allowNull : false,
        },
        phone_num : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
    });
    return seller;
};