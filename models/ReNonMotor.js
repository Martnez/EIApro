
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ReNonMotor = sequelize.define('reNonMotor', {
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
  policyNo:{
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
 
  businessNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  otherName:{
    type: Sequelize.STRING,
    allowNull:true
  },
  chasis:{
    type: Sequelize.STRING,
    allowNull:true
  },
  RegN:{
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
  otherBe:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  TPBP:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  MBP:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  ELBP:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  PANBP:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:'0'
  },
  TPPMBP:{
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
  
  
 
});

module.exports = ReNonMotor;
