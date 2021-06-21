const Policies= require('../models/policy');

const Logs = require('../models/Logs');

// const NonMotor= require('../models/RePolicy');

const Clients =require('../models/Client');
const Vehicles = require('../models/Vehicle');

exports.getUnderwriting= (req,res,next) =>{
  const user = req.user;
  Policies.findAll({include:[{model:Clients},{model:Vehicles}]}).then(policies=>{
    res.render('underwriting', {
      userN:user,
      policies:policies,
        pageTitle: 'underwriting',
        path: '/underwriting',
      //   errorMessage: req.flash('emailError')
        
      })
  }).catch(err=>console.log(err))

  };
  exports.getNewMotor= (req,res,next) =>{
    const user = req.user;
    Clients.findAll({include:{model:Vehicles}}).then(clients=>{
      console.log(clients[0].vehicles[0].RegN)
      res.render('new-motor', {
        userN:user,
        clients:clients,
          pageTitle: 'new-motor',
          path: '/new-motor',
        //   errorMessage: req.flash('emailError') 
  })
    }).catch(err=>console.log(err));
  };
  exports.postNewMotor=(req,res,next)=>{
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
  task: "created a  motor policy",
  userId: user._id,
  time: current_time,
  date:current_date
  });
    log.save();
  const clientId= req.body.clientName;
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
  const regN=req.body.regN;
  console.log(regN);
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
  if(excessProtector[1]=="excessProtector"){
    if(coverType!="Comprehensive"){
      const XbasicPremium= newSumInsured;
      const xtrainingLevy= (XbasicPremium * 0.002);
      const xPHCF = (XbasicPremium * 0.0025);
      const xGrandTotal = (newStampDuty + xtrainingLevy+ xPHCF + XbasicPremium);
      const  policy= new Policies({
        levy:xtrainingLevy,
        PHCF:xPHCF,
        clientId:clientId,
        signature:signature,
        remarks:remarks,
        basicPremium:XbasicPremium,
        rate:rate,
        stampDuty: stampDuty,
        netProfit:xGrandTotal,
        policytype: policytype,
        policyName: policyName,
        coverType: coverType,
        mvClass: mvClass,
        regN: regN,
        sumInsured: sumInsured,
        insurer: insurer,
        poliTe:poliTe,
        perAcc:perAcc,
        pll:passangerLegalLiability,
        Windscreen: windscreenBenefit,
        rescueBenefit: rescueBenefit,
        lossOfUse :lossOfUse,
        policyNumber: policyNumber,
        policyStart: policyStart,
        policyEnd: policyEnd,
        GrandTotal:xGrandTotal,
      });
        policy.save();
    
    res.redirect("/underwriting")
    }else{
      
    if(mvClass.includes('Private')){
      let Xrate = 0.25;
      const exProt =(newSumInsured *(Xrate/100));
      const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      if(exProt<= 5000){
       const exProt= 5000;
       const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
       const  policy= new Policies({
        levy:trainingLevy,
        PHCF:PHCF,
        clientId:clientId,
        
        signature:signature,
        remarks:remarks,
        basicPremium:basicPremium,
        rate:rate,
        rescueBenefit: rescueBenefit,
        stampDuty: stampDuty,
        netProfit:GrandTotal,
        exPro:exProt,
        poliTe:poliTe,
        perAcc:perAcc,
        policytype: policytype,
        policyName: policyName,
        coverType: coverType,
        
        mvClass: mvClass,
        regN: regN,
        sumInsured: sumInsured,
        insurer: insurer,
        pll:passangerLegalLiability,
        Windscreen: windscreenBenefit,
        lossOfUse :lossOfUse,
        policyNumber: policyNumber,
        policyStart: policyStart,
        policyEnd: policyEnd,
        GrandTotal:GrandTotal,
      });
        policy.save();
    
    res.redirect("/underwriting")
        
      }else{
        const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
        const  policy= new Policies({
          levy:trainingLevy,
          PHCF:PHCF,
          clientId:clientId,
          
          signature:signature,
          remarks:remarks,
          basicPremium:basicPremium,
          rate:rate,
          rescueBenefit: rescueBenefit,
          stampDuty: stampDuty,
          netProfit:GrandTotal,
          exPro:exProt,
          poliTe:poliTe,
          perAcc:perAcc,
          policytype: policytype,
          policyName: policyName,
          coverType: coverType,
          
          mvClass: mvClass,
          regN: regN,
          sumInsured: sumInsured,
          insurer: insurer,
          pll:passangerLegalLiability,
          Windscreen: windscreenBenefit,
          lossOfUse :lossOfUse,
          policyNumber: policyNumber,
          policyStart: policyStart,
          policyEnd: policyEnd,
          GrandTotal:GrandTotal,
        });
          policy.save();
      
      res.redirect("/underwriting")
        
      }
    }else{
      let Xrate =0.5;
      const exProt =(newSumInsured*(Xrate/100))
      const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      if(exProt <= 2500){
       const exProt =2500;
       const  policy= new Policies({
        levy:trainingLevy,
        PHCF:PHCF,
        clientId:clientId,
        
        signature:signature,
        remarks:remarks,
        basicPremium:basicPremium,
        rate:rate,
        rescueBenefit: rescueBenefit,
        stampDuty: stampDuty,
        netProfit:GrandTotal,
        exPro:exProt,
        poliTe:poliTe,
        perAcc:perAcc,
        policytype: policytype,
        policyName: policyName,
        coverType: coverType,
        
        mvClass: mvClass,
        regN: regN,
        sumInsured: sumInsured,
        insurer: insurer,
        pll:passangerLegalLiability,
        Windscreen: windscreenBenefit,
        lossOfUse :lossOfUse,
        policyNumber: policyNumber,
        policyStart: policyStart,
        policyEnd: policyEnd,
        GrandTotal:GrandTotal,
      });
        policy.save();
    
    res.redirect("/underwriting")
      }else{
      const subBasic = (basicPremium + exProt + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
        const  policy= new Policies({
          levy:trainingLevy,
          PHCF:PHCF,
          clientId:clientId,
          
          signature:signature,
          remarks:remarks,
          basicPremium:basicPremium,
          rate:rate,
          rescueBenefit: rescueBenefit,
          stampDuty: stampDuty,
          netProfit:GrandTotal,
          exPro:exProt,
          poliTe:poliTe,
          perAcc:perAcc,
          policytype: policytype,
          policyName: policyName,
          coverType: coverType, 
          mvClass: mvClass,
          regN: regN,
          sumInsured: sumInsured,
          insurer: insurer,
          pll:passangerLegalLiability,
          Windscreen: windscreenBenefit,
          lossOfUse :lossOfUse,
          policyNumber: policyNumber,
          policyStart: policyStart,
          policyEnd: policyEnd,
          GrandTotal:GrandTotal,
        });
          policy.save();
      
      res.redirect("/underwriting")
  
      }
    }
    } 
  }else{
    const subBasic = (basicPremium + newPoliTe + newPerAcc + newOtherBe);
    const trainingLevy= (subBasic * 0.002);
    const PHCF = (subBasic * 0.0025);
    const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      const  policy= new Policies({
        levy:trainingLevy,
        PHCF:PHCF,
        clientId:clientId,
        signature:signature,
        remarks:remarks,
        basicPremium:basicPremium,
        rate:rate,
        rescueBenefit: rescueBenefit,
        stampDuty: stampDuty,
        netProfit:GrandTotal,
        poliTe:poliTe,
        perAcc:perAcc,
        policytype: policytype,
        policyName: policyName,
        coverType: coverType,
        mvClass: mvClass,
        regN: regN,
        sumInsured: sumInsured,
        insurer: insurer,
        pll:passangerLegalLiability,
        Windscreen: windscreenBenefit,
        lossOfUse :lossOfUse,
        policyNumber: policyNumber,
        policyStart: policyStart,
        policyEnd: policyEnd,
        GrandTotal:GrandTotal,
      });
        policy.save();
    
    res.redirect("/underwriting")

    }
  
  };
  exports.getNewNonMotor= (req,res,next) =>{
    const user = req.user;
    Clients.findAll().then(clients=>{
      res.render('new-non-motor', {
        userN:user,
        clients:clients,
          pageTitle: 'new-non-motor',
          path: '/new-non-motor',
        //   errorMessage: req.flash('emailError') 
  })
    }).catch(err=>console.log(err));
    
    
  };
  exports.postNonMotor= (req,res,next)=>{
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
    const clientId= req.body.clientName;
    const policytype= 'NonMotor vehicles';
    let stampDuty =req.body.stampDuty;
    let rate = req.body.rate;
    const policyName= req.body.policyName;
    const signature = user.firstName;
    const regN= req.body.regN;
    const chassisN= req.body.chassisN;
    const remarks = req.body.remarks;
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
    let basicPremium = (newSumInsured *(NewRate/100));
    let subBasic = (basicPremium +newPAL+newMP+newPVT+newTPL);
    let trainingLevy= (subBasic * 0.002);
    let PHCF = (subBasic * 0.0025);
    const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
    const policy= new Policies({
      basicPremium:basicPremium,
      levy:trainingLevy,
      remarks:remarks,
      PHCF:PHCF,
      clientId:clientId,
      signature:signature,
      rate:rate,
      stampDuty: stampDuty,
      PVT:PVT,
      MP:MP,
      PAL:PAL,
      TPL:TPL,
      policytype: policytype,
      policyName: policyName,
      coverType: coverType,
      sumInsured: sumInsured,
      insurer: insurer,
      policyNumber: policyNumber,
      policyStart: policyStart,
      policyEnd: policyEnd,
      GrandTotal:GrandTotal,
    });
      policy.save();
  
  res.redirect("/underwriting")
  };
  exports.getPolicyView=(req,res,next)=>{
    const policyId =req.params.policyId;
    const user = req.user;
  
    Policies.findOne({where:{id:policyId},include:[{model:Clients}]}).then(
      policy=>{
        const  PVT=policy.PVT;
        const   MP=policy.MP;
        const   PAL=policy.PAL;
        const   TPL=policy.TPL; 
        const   poliTe=policy.poliTe;
        const   perAcc=policy.perAcc;
        const   pll=policy.pll;
        const   Windscreen= policy.windscreen;
        const   rescueBenefit= policy.rescueBenefit;
        const   lossOfUse =policy.lossOfUse;  
        if(policy.policytype == 'Motor vehicles'){
          
        res.render('motor-view',{
         
          userN:user,
          poliTe:poliTe,
          perAcc:perAcc,
          pll:pll,
          policy:policy,
          Windscreen: Windscreen,
          rescueBenefit: rescueBenefit,
          lossOfUse :lossOfUse,
            pageTitle: 'motor-view',
            path:'/motor-view',
        });
        }else{
          res.render('non-motor-view',{
            userN:user,
            PVT:PVT,
            MP:MP,
            PAL:PAL,
            TPL:TPL,
            userN:user ,
            policy:policy,
              pageTitle: 'non-motor-view',
              path:'/non-motor-view',
          });
  
        }
      }
    ).catch(err=>{
      console.log(err);
    })
  
  };
