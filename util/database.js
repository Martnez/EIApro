const Sequelize = require("sequelize");

const sequelize = new Sequelize("eia", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
