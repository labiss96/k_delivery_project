module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Customer', {
        customer_id: {
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
            allowNull : false,
        },
        longitude : {
            type : DataTypes.DOUBLE,
            allowNull : false,
        }
    },{
        timestamps: false,
    });
}