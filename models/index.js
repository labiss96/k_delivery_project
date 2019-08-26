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
db.Menu = require('./menu')(sequelize, Sequelize);
db.Cart = require('./cart')(sequelize, Sequelize);
db.Payment_log = require('./payment_log')(sequelize, Sequelize);

//관계설정
db.Restaurants.hasMany(db.Menu,{foreignKey:'restaurant_id'});
db.Seller.hasMany(db.Restaurants, {foreignKey: 'seller_id'});
db.Cart.hasMany(db.Menu,{foreignKey: 'cart_id'});
db.Customer.hasOne(db.Cart,{foreignKey:'user_id'});
db.Customer.hasMany(db.Payment_log,{foreignKey:'customer_id'});
db.Restaurants.hasMany(db.Payment_log,{foreignKey:'seller_id'});
db.Restaurants.hasMany(db.Cart,{foreignKey:'resaurant_id'});
module.exports = db;



