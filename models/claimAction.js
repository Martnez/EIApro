
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const claimAction = sequelize.define('claimAction', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  setdate:{
    type:Sequelize.DATEONLY,
    allowNull:false,
  }, 
  
  reporter:{
    type: Sequelize.STRING,
    allowNull:false
  },
  action:{
    type: Sequelize.STRING,
    allowNull:false
  }
});

module.exports = claimAction;
