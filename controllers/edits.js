const Vehicles = require('../models/Vehicle');

const Logs = require('../models/Logs');
const Policies= require('../models/policy');

const User = require('../models/User');


const Claim = require('../models/Claims');

const bcrypt= require('bcrypt');

const crypto = require('crypto');

const Clients =require('../models/Client');

exports.getVehicleEdit=(req,res,next)=>{
    const user = req.user;
 const vehicleId= req.params.vehicleId;
 Vehicles.findOne({where:{id:vehicleId}}).
 then(vehicle=>{
    res.render('edit-vehicle', {
        userN:user,
        vehicle:vehicle,
          pageTitle: 'edit vehicle details',
          path: '/edit-vehicle',  
  })
 })
 .catch(err=>console.log(err))

};
exports.postVehicleEdit=(req,res,next)=>{
    const vehicleId = req.params.vehicleId;
    const user = req.user;
    let today = new Date()
    let month = today.getMonth() + 1;
    let date= today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let secs = today.getSeconds();
    const current_date = `${month}/${date}/${year}`;
    const current_time = `${hour}:${min}:${secs}`;
  
  const log= new Logs({
  task: "Edited client details",
  userId: user._id,
  time: current_time,
  date:current_date
  });
    log.save();
    
  const regN = req.body.regN;
  const chassisN = req.body.chassisN;
  const logbookN = req.body.logbookN;
  const make = req.body.make;
  const yom = req.body.yom;
  const engineN = req.body.engineN;
  const color = req.body.color;
  const loadingCapacity= req.body.loadingCapacity;
  const owner = req.body.owner;
 Vehicles.findOne({where:{id:vehicleId}}).then(vehicle=>{

        vehicle.RegN=regN,
        vehicle.Chasis=chassisN,
        vehicle.LogBook=logbookN,
        vehicle.Make=make,
        vehicle.MOY=yom,
        vehicle.EngNo=engineN,
        vehicle.Color=color,
        vehicle.LoadingCapacity=loadingCapacity,
        vehicle.Owner=owner
        vehicle.save();
    }).then(result=>{
        return res.redirect(`/vehicle-view/${vehicleId}`)
    }).catch(err=>console.log(err))
   
    
 

  };
  // get client Edit
  exports.getClientEdit= (req,res,next) =>{
    const user = req.user;
    const clientId = req.params.clientId
    Clients.findOne({where:{id:clientId}}).then(client=>{
      
    res.render('client-edit', {
      userN:user,
      client:client,
        pageTitle: 'client-edit',
        path: '/client-edit',
        
  })
   
  });
  
  };

  exports.postClientEdit=(req,res,next)=>{
    const user = req.user;
    let today = new Date()
    let month = today.getMonth() + 1;
    let date= today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let secs = today.getSeconds();
    const current_date = `${month}/${date}/${year}`;
    const current_time = `${hour}:${min}:${secs}`;
  
  const log= new Logs({
  task: "Edited client Details",
  userId: user._id,
  time: current_time,
  date:current_date
  });
    log.save();
    const clientId= req.params.clientId;
    const signature = user.firstName;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber =req.body.phoneNumber;
    const city =req.body.city;
    const boxOffice = req.body.boxOffice;
    const idNumber = req.body.clientIdN;
    const businessType = req.body.businessType;
    const businessNature = req.body.businessNature;
    const pin = req.body.pin;
    const level = req.body.level;
    const contactPerson = req.body.contactPerson;
    const contactPersonNumber = req.body.contactPhone
    

    Clients.findOne({where:{id:clientId}}).then(client=>{
      
      client.email= email,
      client.firstName = firstName,
      client.lastName=lastName,
      client.phoneNumber=phoneNumber,
      client.boxOffice= boxOffice,
      client.town = city
      client.signature=signature,
      client.idNumber= idNumber,
      client.businessType=businessType,
      client.businessNature=businessNature,
      client.pin=pin,
      client.level=level,
      client.contactPerson=contactPerson,
      client.contactPersonNumber=contactPersonNumber


      client.save();
  
    }).then(result=>{
      res.redirect(`/client-profile/${clientId}`);
    }).catch(err => {
      console.log(err);
    });
  
  
  
  };
  // non motor edit

  exports.getNonMotorEdit= (req,res,next) =>{
    const user = req.user;
    const policyId = req.params.policyId;
    Policies.findOne({where:{id:policyId},include:{model:Clients}}).then(
      policy=>{
      res.render('nonMotor-edit', {
        userN:user,
        policy:policy,
          pageTitle: 'nonMotor-edit',
          path: '/nonMotor-edit',
        //   errorMessage: req.flash('emailError') 
  })
    }).catch(err=>console.log(err));
    
    
  };
  exports.postNonMotorEdit= (req,res,next)=>{
    const policyId = req.params.policyId;
    const user = req.user;
    let today = new Date()
    let month = today.getMonth() + 1;
    let date= today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let secs = today.getSeconds();
    const current_date = `${year}/${month}/${date}`;
    const current_time = `${hour}:${min}:${secs}`;
  
  const log= new Logs({
  task: "Edited a Non Motor policy",
  userId: user._id,
  time: current_time,
  date:current_date
  });
    log.save();
    const policytype= 'NonMotor vehicles';
    let stampDuty =req.body.stampDuty;
    let rate = req.body.rate;
 console.log(rate)
    const policyName= req.body.policyName;
    const signature = user.firstName;
    const regN= req.body.regN;
    const chassisN= req.body.chassisN;
    const remarks = req.body.remarks;
    console.log(remarks)
    const coverType = req.body.coverType;
    const policyNumber= req.body.policyNumber;
    const policyStart= req.body.policyStart;
    const policyEnd = req.body.policyEnd;
    let sumInsured= req.body.sumInsuredPoa;
    const insurer =req.body.insurer;
    let PAL = req.body.PAL;
    let MP = req.body.MP;
    let PVT= req.body.PVT;
    let TPL=req.body.TPL;
    let newStampDuty = (stampDuty-0) || 0;
    let NewRate = (rate-0) || 1;
    let newSumInsured=(sumInsured-0) || 0;
    let newPAL= (PAL-0) || 0;
    let newMP = (MP-0) || 0;
    let newPVT= (PVT-0) || 0;
    let newTPL= (TPL-0) || 0;
    if(coverType=="Work Injury Benefit"){
      let basicPremium = (newSumInsured);
      let subBasic = (basicPremium +newPAL+newMP+newPVT+newTPL);
      let trainingLevy= (subBasic * 0.002);
      let PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      Policies.findOne({where:{id:policyId}}).then(policy=>{
       
          policy.basicPremium=basicPremium,
          policy.regN=regN,
          policy.chassis=chassisN,
          policy.levy=trainingLevy,
          policy.remarks=remarks,
          policy.PHCF=PHCF,
          policy.signature=signature,
          policy.rate=rate,
          policy.stampDuty= stampDuty,
          policy.PVT=PVT,
          policy.MP=MP,
          policy.PAL=PAL,
          policy.TPL=TPL,
          policy.policytype= policytype,
          policy.policyName= policyName,
          policy.coverType= coverType,
          policy.sumInsured= sumInsured,
          policy.insurer= insurer,
          policy.policyNumber= policyNumber,
          policy.policyStart= policyStart,
          policy.policyEnd= policyEnd,
          policy.GrandTotal=GrandTotal,
        
          policy.save();
      
      
      }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
      
    }else{
      let basicPremium = (newSumInsured *(NewRate/100));
      let subBasic = (basicPremium +newPAL+newMP+newPVT+newTPL);
      let trainingLevy= (subBasic * 0.002);
      let PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      Policies.findOne({where:{id:policyId}}).then(policy=>{
        
        policy.basicPremium=basicPremium,
        policy.regN=regN,
        policy.chassis=chassisN,
        policy.levy=trainingLevy,
        policy.remarks=remarks,
        policy.PHCF=PHCF,
        policy.signature=signature,
        policy.rate=rate,
        policy.stampDuty= stampDuty,
        policy.PVT=PVT,
        policy.MP=MP,
        policy.PAL=PAL,
        policy.TPL=TPL,
        policy.policytype= policytype,
        policy.policyName= policyName,
        policy.coverType= coverType,
        policy.sumInsured= sumInsured,
        policy.insurer= insurer,
        policy.policyNumber= policyNumber,
        policy.policyStart= policyStart,
        policy.policyEnd= policyEnd,
        policy.GrandTotal=GrandTotal,
     
        policy.save();
    
    }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>{console.log(err)})
      
    }

  };
  // motor edit
  exports.getMotorEdit= (req,res,next) =>{
    const user = req.user;
    const policyId = req.params.policyId;
    Policies.findOne({where:{id:policyId},include:[{model:Clients},{model:Vehicles}]}).then(
      policy=>{
      res.render('motor-edit', {
        userN:user,
        policy:policy,
          pageTitle: 'motor-edit',
          path: '/motor-edit',
  })
    }).catch(err=>console.log(err));
    
    
  };
  exports.postMotorEdit=(req,res,next)=>{
    const user = req.user;
    const policyId = req.params.policyId;
    let today = new Date()
    let month = today.getMonth() + 1;
    let date= today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let secs = today.getSeconds();
    const current_date = `${year}/${month}/${date}`;
    const current_time = `${hour}:${min}:${secs}`;
  
  const log= new Logs({
  task: "created a  motor policy",
  userId: user._id,
  time: current_time,
  date:current_date
  });
    log.save();
  const policytype= 'Motor vehicles';
  let stampDuty ='40';
  const excessProtector = req.body.excessProtector;
  const rate = req.body.rate;
  const signature = user.firstName;
  const remarks = req.body.remarks;
  const policyName= req.body.policyName;
  const coverType = req.body.coverType;
  const policyNumber= req.body.policyN;
  const mvClass = req.body.mvClass;
  const policyStart= req.body.policyStart;
  const policyEnd = req.body.policyEnd;
  // const vehicleId = req.body.regN;
  const sumInsured= req.body.sumInsuredPoa;
  const insurer =req.body.insurer;
  let newSumInsured= (sumInsured-0) || 0;
  const poliTe = req.body.pvt;
  const perAcc= req.body.personalAccident;
  const windscreenBenefit=req.body.windscreenBenefit;
  const lossOfUse= req.body.lossOfUse;
  const passangerLegalLiability =req.body.passangerLegalLiability;
  const rescueBenefit =req.body.rescueBenefit;
  let newStampDuty = (stampDuty-0) || 0;
  let NewRate = (rate-0) || 1;
  let newPoliTe= (poliTe-0) || 0;
  let newPerAcc= (perAcc-0) || 0;
  let wb= (windscreenBenefit-0)||0;
  let lof = (lossOfUse-0)||0;
  let pll =(passangerLegalLiability-0)||0;
  let rb=(rescueBenefit-0)||0;
  let newOtherBe = (wb+lof+pll+rb) || 0;
  let basicPremium = (newSumInsured *(NewRate/100));
  console.log(excessProtector)
  if(excessProtector=="excessProtector"){
    if(coverType!="Comprehensive"){
      const XbasicPremium= newSumInsured;
      const xtrainingLevy= (XbasicPremium * 0.002);
      const xPHCF = (XbasicPremium * 0.0025);
      const xGrandTotal = (newStampDuty + xtrainingLevy+ xPHCF + XbasicPremium);
    Policies.findOne({where:{id:policyId}}).then(
      policy=>{
        policy.levy=xtrainingLevy,
        policy.PHCF=xPHCF,
        
        policy.signature=signature,
        policy.remarks=remarks,
        policy.basicPremium=XbasicPremium,
        policy.rate=rate,
        policy.stampDuty= stampDuty,
        policy.netProfit=xGrandTotal,
        policy.policytype= policytype,
        policy.policyName= policyName,
        policy.coverType= coverType,
        policy.mvClass= mvClass,
        
        policy.sumInsured= sumInsured,
        policy.insurer= insurer,
        policy.poliTe=poliTe,
        policy.perAcc=perAcc,
        policy.pll=passangerLegalLiability,
        policy.Windscreen= windscreenBenefit,
        policy.rescueBenefit= rescueBenefit,
        policy.lossOfUse =lossOfUse,
        policy.policyNumber= policyNumber,
        policy.policyStart= policyStart,
        policy.policyEnd= policyEnd,
        policy.GrandTotal=xGrandTotal,
    
        policy.save();
      }
    ).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
    

    }else{
      
    if(mvClass.includes('Private')){
      let Xrate = 0.25;
      const exProt =(newSumInsured *(Xrate/100));
      if(insurer=="Fidelity Shield  Insurance Co. Ltd" && exProt<5000){
        const exProt= 5000;
        const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
       const trainingLevy= (subBasic * 0.002);
       const PHCF = (subBasic * 0.0025);
       const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
       Policies.findOne({where:{id:policyId}}).then(policy=>{
         policy.levy=trainingLevy,
         policy.PHCF=PHCF,
         
         
         policy.signature=signature,
         policy.remarks=remarks,
         policy.basicPremium=basicPremium,
         policy.rate=rate,
         policy.rescueBenefit= rescueBenefit,
         policy.stampDuty= stampDuty,
         policy.netProfit=GrandTotal,
         policy.exPro=exProt,
         policy.poliTe=poliTe,
         policy.perAcc=perAcc,
         policy.policytype= policytype,
         policy.policyName= policyName,
         policy.coverType= coverType,
         
         policy.mvClass= mvClass,
         
         policy.sumInsured= sumInsured,
         policy.insurer= insurer,
         policy.pll=passangerLegalLiability,
         policy.Windscreen= windscreenBenefit,
         policy.lossOfUse =lossOfUse,
         policy.policyNumber= policyNumber,
         policy.policyStart= policyStart,
         policy.policyEnd= policyEnd,
         policy.GrandTotal=GrandTotal,
     
         policy.save();
 
       }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))

      }else{ const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
        const trainingLevy= (subBasic * 0.002);
        const PHCF = (subBasic * 0.0025);
        const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
        if(exProt<= 2500){
         const exProt= 2500;
         const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
        const trainingLevy= (subBasic * 0.002);
        const PHCF = (subBasic * 0.0025);
        const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
        Policies.findOne({where:{id:policyId}}).then(policy=>{
          policy.levy=trainingLevy,
          policy.PHCF=PHCF,
          policy.signature=signature,
          policy.remarks=remarks,
          policy.basicPremium=basicPremium,
          policy.rate=rate,
          policy.rescueBenefit= rescueBenefit,
          policy.stampDuty= stampDuty,
          policy.netProfit=GrandTotal,
          policy.exPro=exProt,
          policy.poliTe=poliTe,
          policy.perAcc=perAcc,
          policy.policytype= policytype,
          policy.policyName= policyName,
          policy.coverType= coverType,
          
          policy.mvClass= mvClass,
          
          policy.sumInsured= sumInsured,
          policy.insurer= insurer,
          policy.pll=passangerLegalLiability,
          policy.Windscreen= windscreenBenefit,
          policy.lossOfUse =lossOfUse,
          policy.policyNumber= policyNumber,
          policy.policyStart= policyStart,
          policy.policyEnd= policyEnd,
          policy.GrandTotal=GrandTotal,
      
          policy.save();
  
        }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
         
   
          
        }else{
          const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
        const trainingLevy= (subBasic * 0.002);
        const PHCF = (subBasic * 0.0025);
        const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
        Policies.findOne({where:{id:policyId}}).then(policy=>{
          policy.levy=trainingLevy,
          policy.PHCF=PHCF,
          
          
          policy.signature=signature,
          policy.remarks=remarks,
          policy.basicPremium=basicPremium,
          policy.rate=rate,
          policy.rescueBenefit= rescueBenefit,
          policy.stampDuty= stampDuty,
          policy.netProfit=GrandTotal,
          policy.exPro=exProt,
          policy.poliTe=poliTe,
          policy.perAcc=perAcc,
          policy.policytype= policytype,
          policy.policyName= policyName,
          policy.coverType= coverType,
          
          policy.mvClass= mvClass,
          
          policy.sumInsured= sumInsured,
          policy.insurer= insurer,
          policy.pll=passangerLegalLiability,
          policy.Windscreen= windscreenBenefit,
          policy.lossOfUse =lossOfUse,
          policy.policyNumber= policyNumber,
          policy.policyStart= policyStart,
          policy.policyEnd= policyEnd,
          policy.GrandTotal=GrandTotal,
        
          policy.save();
        }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
          
  
          
        }}
     
    }else{
      let Xrate =0.5;
      const exProt =(newSumInsured*(Xrate/100))
      const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      if(exProt <= 5000){
       const exProt =5000;
       Policies.findOne({where:{id:policyId}}).then(policy=>{
        policy.levy=trainingLevy,
        policy.PHCF=PHCF,
        
        
        policy.signature=signature,
        policy.remarks=remarks,
        policy.basicPremium=basicPremium,
        policy.rate=rate,
        policy.rescueBenefit= rescueBenefit,
        policy.stampDuty= stampDuty,
        policy.netProfit=GrandTotal,
        policy.exPro=exProt,
        policy.poliTe=poliTe,
        policy.perAcc=perAcc,
        policy.policytype= policytype,
        policy.policyName= policyName,
        policy.coverType= coverType,
        
        policy.mvClass= mvClass,
        
        policy.sumInsured= sumInsured,
        policy.insurer= insurer,
        policy.pll=passangerLegalLiability,
        policy.Windscreen= windscreenBenefit,
        policy.lossOfUse =lossOfUse,
        policy.policyNumber= policyNumber,
        policy.policyStart= policyStart,
        policy.policyEnd= policyEnd,
        policy.GrandTotal=GrandTotal,
      
        policy.save();

       }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
       

      }else{
      const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      Policies.findOne({where:{id:policyId}}).then(policy=>{
        policy.levy=trainingLevy,
        policy.PHCF=PHCF,
        
        
        policy.signature=signature,
        policy.remarks=remarks,
        policy.basicPremium=basicPremium,
        policy.rate=rate,
        policy.rescueBenefit= rescueBenefit,
        policy.stampDuty= stampDuty,
        policy.netProfit=GrandTotal,
        policy.exPro=exProt,
        policy.poliTe=poliTe,
        policy.perAcc=perAcc,
        policy.policytype= policytype,
        policy.policyName= policyName,
        policy.coverType= coverType, 
        policy.mvClass= mvClass,
        
        policy.sumInsured= sumInsured,
        policy.insurer= insurer,
        policy.pll=passangerLegalLiability,
        policy.Windscreen= windscreenBenefit,
        policy.lossOfUse =lossOfUse,
        policy.policyNumber= policyNumber,
        policy.policyStart= policyStart,
        policy.policyEnd= policyEnd,
        policy.GrandTotal=GrandTotal,
    
        policy.save();
      }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
        
 
  
      }
    }
    } 
  }else{
    const subBasic = (basicPremium + newPoliTe + newPerAcc + newOtherBe);
    const trainingLevy= (subBasic * 0.002);
    const PHCF = (subBasic * 0.0025);
    const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
    Policies.findOne({where:{id:policyId}}).then(policy=>{
      policy.levy=trainingLevy,
      policy.PHCF=PHCF,
      
      policy.signature=signature,
      policy.remarks=remarks,
      policy.basicPremium=basicPremium,
      policy.rate=rate,
      policy.rescueBenefit= rescueBenefit,
      policy.stampDuty= stampDuty,
      policy.netProfit=GrandTotal,
      policy.poliTe=poliTe,
      policy.perAcc=perAcc,
      policy.policytype= policytype,
      policy.policyName= policyName,
      policy.coverType= coverType,
      policy.mvClass= mvClass,
      
      policy.sumInsured= sumInsured,
      policy.insurer= insurer,
      policy.pll=passangerLegalLiability,
      policy.Windscreen= windscreenBenefit,
      policy.lossOfUse =lossOfUse,
      policy.policyNumber= policyNumber,
      policy.policyStart= policyStart,
      policy.policyEnd= policyEnd,
      policy.GrandTotal=GrandTotal,
  
      policy.save();
    }).then(result=>{res.redirect(`/policyView/${policyId}`)}).catch(err=>console.log(err))
      
    }
  
  };