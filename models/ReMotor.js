
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ReMotor = sequelize.define('reMotor', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  policytype:{
    type: Sequelize.STRING,
    allowNull:true
  },
  policyName:{
    type: Sequelize.STRING,
    allowNull:true
  },
  coverType:{
    type:Sequelize.STRING,
    allowNull:true,
    
  },
  branch:{
    type:Sequelize.STRING,
    allowNull:true,
    
  },
  mvClass:{
    type: Sequelize.STRING,
    allowNull:true
  },
  regN:{
    type: Sequelize.STRING,
    allowNull:true
  },
  sumInsured:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  insurer:{
    type: Sequelize.STRING,
    allowNull:true
  },
  otherName:{
    type: Sequelize.STRING,
    allowNull:true
  },
  policyStart:{
    type: Sequelize.DATEONLY,
    allowNull:true
  },
  policyEnd:{
    type: Sequelize.DATEONLY,
    allowNull:true
  },
  policyNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  signature:{
    type: Sequelize.STRING,
    allowNull:true
  },
  exPro:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
    
  },
  poliTe:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  perAcc:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  otherBe:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  netProfit:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  GrandTotal:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  stampDuty:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  rate:{
    type: Sequelize.STRING,
    allowNull:true,
    defaultValue:'0'
  },
  PHCF:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  levy:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  basicPremium:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  remarks:{
    type: Sequelize.STRING,
    allowNull:true
  },
  Windscreen:{
    type: Sequelize.STRING,
    allowNull:true
  },
  Passengers:{
    type: Sequelize.STRING,
    allowNull:true
  },
  Rescue:{
    type: Sequelize.STRING,
    allowNull:true
  },
  
  
 
});

module.exports = ReMotor;
