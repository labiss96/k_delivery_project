module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin', {
        username: {
            type : DataTypes.STRING(10),
            allowNull : false,
            unique : true,
        },
        password : {
            type: DataTypes.STRING(50),
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING(20),
            allowNull : false,
            unique : true,
        },
    },{
        timestamps: false,
    });
}