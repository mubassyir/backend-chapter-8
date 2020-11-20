//consume data credential
const dbConfig = require("../config/db.config.js");  
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.pool.idle,
  },
});

let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.bio = require("./bio.model.js")(sequelize, Sequelize);
db.history = require("./history.model.js")(sequelize, Sequelize);

db.history.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});
db.bio.belongsTo(db.user, {
  foreignKey: {
    name: "user_id",
  },
});
// db.user.hasOne(db.bio,{
//   foreignKey:"user_id"
// })

module.exports = db;
