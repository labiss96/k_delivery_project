module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Customer', {
        username: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        password : {
            type: DataTypes.STRING(30),
            allowNull : false,
        },
        address : {
            type : DataTypes.STRING(255),
            allowNull : false,    
        },
        phone_num : {
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        latitude : {
            type : DataTypes.DOUBLE,
            allowNull : true,
        },
        longitude : {
            type : DataTypes.DOUBLE,
            allowNull : true,
        }
    },{
        timestamps: false,
    });
}