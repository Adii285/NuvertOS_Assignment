const dbConfig = require("../configs/dbConfigs");
const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    }
  }
);

sequelize.authenticate()
.then(() => {
  console.log('Connected...')
})
.catch(err => {
  console.log('Error' + err)
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.compound = require("./compoundModel")(sequelize, DataTypes);

db.sequelize.sync({force: false})
.then(() => {
  console.log('Re-sync done!')
})

module.exports = db;