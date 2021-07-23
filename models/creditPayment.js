
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const creditPayment = sequelize.define('creditPayment', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  p_paid:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  p_mode:{
    type: Sequelize.STRING,
    allowNull:true
  },
  p_date:{
    type: Sequelize.DATEONLY,
    allowNull:true
  },
  refNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  creditPayFile:{
    type: Sequelize.STRING,
    allowNull:true
  },
  
  
 
  
});

module.exports = creditPayment;
