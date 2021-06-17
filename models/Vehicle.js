
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Vehicles = sequelize.define('vehicle', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  RegN:{
    type: Sequelize.STRING,
    allowNull:false
  }, 
  Chasis:{
    type: Sequelize.STRING,
    allowNull:false
  },
  LogBook:{
    type: Sequelize.STRING,
    allowNull:false
  },
  Make:{
    type: Sequelize.STRING,
    allowNull:false
  },
  MOY:{
    type: Sequelize.STRING,
    allowNull:false
  },
  EngNo:{
    type: Sequelize.STRING,
    allowNull:false
  },
  Color:{
    type: Sequelize.STRING,
    allowNull:false
  },
  LoadingCapacity:{
    type: Sequelize.STRING,
    allowNull:false
  },
  Owner:{
    type: Sequelize.STRING,
    allowNull:false
  },
});

module.exports = Vehicles;
