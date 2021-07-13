
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const insurancePayment = sequelize.define('insurancePayment', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  comm_rate:{
    type: Sequelize.STRING,
    allowNull:true,
    defaultValue:'0'
  },
  comm_amount:{
    type: Sequelize.STRING,
    allowNull:true
  },
  ovr_rate:{
    type: Sequelize.STRING,
    allowNull:true
  },
  ovr_amount:{
    type: Sequelize.STRING,
    allowNull:true
  },
  special_disc:{
    type: Sequelize.STRING,
    allowNull:true
  },  
});

module.exports = insurancePayment;
