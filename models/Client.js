
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Client = sequelize.define('clients', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  town:{
    type: Sequelize.STRING,
    allowNull:false
  },
  
  boxOffice:{
    type: Sequelize.STRING,
    allowNull:false
  },
  phoneNumber:{
    type: Sequelize.STRING,
    allowNull:false
  },
  email:{
    type: Sequelize.STRING,
    allowNull:false
  },
  idNumber:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  businessType:{
    type: Sequelize.STRING,
    allowNull:false
  },
  businessNature:{
    type: Sequelize.STRING,
    allowNull:false
  },
  pin:{
    type: Sequelize.STRING,
    allowNull:false
  },
  regNumber:{
    type: Sequelize.STRING,
    allowNull:false
  },
  level:{
    type: Sequelize.STRING,
    allowNull:false
  },
  contactPerson:{
    type: Sequelize.STRING,
    allowNull:false
  },
  contactPersonNumber:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  signature:{
    type: Sequelize.STRING,
    allowNull:true
  },
 
  
});

module.exports = Client;
