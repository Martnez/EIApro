const Sequelize = require("sequelize");

const sequelize = new Sequelize("eia", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
