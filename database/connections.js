const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.DATABASE,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
  }
);
sequelize.sync({ alter: true });
const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (error) {
    console.log("error while connecting to the database");
  }
};
authenticated();
module.exports = sequelize;
global.exports = sequelize;
