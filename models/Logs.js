
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Log = sequelize.define('logs', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  task:{
    type: Sequelize.STRING,
    allowNull:false
  },
  time:{
    type:Sequelize.TIME,
    allowNull:false,
  },
  date:{
    type:Sequelize.DATEONLY,
    allowNull:false,
  },
  
 
  
});

module.exports = Log;
