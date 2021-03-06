module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Admin', {
        username: {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        password : {
            type: DataTypes.STRING(30),
            allowNull : false,
        },
        email : {
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
    },{
        timestamps: false,
    });
}