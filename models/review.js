module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Review', {
        rating: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        comment : {
            type: DataTypes.STRING(50),
            allowNull : false,
        },
        writer : {
            type: DataTypes.STRING(20),
            allowNull : false,
        }
     
    },
        
    );
}
