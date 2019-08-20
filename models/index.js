var path = require('path');
var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Admin = require('./admin')(sequelize, Sequelize);
db.Seller = require('./seller')(sequelize, Sequelize);
db.Customer = require('./customer')(sequelize, Sequelize);
db.Restaurants = require('./restaurants')(sequelize, Sequelize);

// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

module.exports = db;



