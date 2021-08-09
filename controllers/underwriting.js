const Policies= require('../models/policy');

const Logs = require('../models/Logs');

const Clients =require('../models/Client');
const Vehicles = require('../models/Vehicle');
const Credit = require('../models/creditCollection');

exports.getUnderwriting= (req,res,next) =>{
  const user = req.user;
  Policies.findAll({where:{delete:'0'},order: [ [ 'createdAt', 'DESC' ]],include:[{model:Clients},{model:Vehicles}]}).then(policies=>{
    res.render('underwriting', {
      user:user,
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
      console.log(clients[0].vehicles[0])
      res.render('new-motor', {
        user:user,
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
    const current_date = `${month}/${date}/${year}`;
    const current_time = `${hour}:${min}:${secs}`;
  
  const log= new Logs({
  task: "Created new Motor policy",
  userId: user.id,
  time: current_time,
  date:current_date
  });
    log.save();
    const clientId= req.body.clientName;
  const policytype= 'Motor vehicles';
  let stampDuty =req.body.stamp_duty;
  const rate = req.body.rate;
  const signature = user.firstName;
  const branch = req.body.branch;
  const remarks = req.body.remarks;
  const policyName= req.body.policyName;
  const coverType = req.body.coverType;
  const policyNumber= req.body.policyN;
  const mvClass = req.body.mvClass;
  const policyStart= req.body.policyStart;
  const policyEnd = req.body.policyEnd;
  const vehicleId = req.body.regN;
  const sumInsured= req.body.sumInsuredPoa;
  const insurer =req.body.insurer;
  const otherCharges=req.body.otherCharges;
  let newSumInsured= (sumInsured-0) || 0;
  console.log(newSumInsured);
  const poliTe = req.body.pvt;
  const perAcc= req.body.personalAccident;
  const windscreenBenefit=req.body.windscreenBenefit;
  const lossOfUse= req.body.lossOfUse;
  const passangerLegalLiability =req.body.passangerLegalLiability;
  const rescueBenefit =req.body.rescueBenefit;
  let newStampDuty = (stampDuty-0) || 0;
  let newOtherCharges =(otherCharges-0)|| 0;
  let NewRate = (rate-0) || 1;
  let newPoliTe= (poliTe-0) || 0;
  let newPerAcc= (perAcc-0) || 0;
  let wb= (windscreenBenefit-0)||0;
  let lof = (lossOfUse-0)||0;
  let pll =(passangerLegalLiability-0)||0;
  let rb=(rescueBenefit-0)||0;
  let newOtherBe = (wb+lof+pll+rb) || 0;
  // let expoRate =1;
  let excessProtector = req.body.excessProtector;
     expo=(excessProtector-0)||0;
  let basicPremium = 5000;
  // if(coverType=="Comprehensive"){expoRate=0.005};
  // if(mvClass.includes("Private")){expoRate=0.0025};
    // expo=(newSumInsured*expoRate);
    // if(!(mvClass.includes("Private"))&&coverType=="Comprehensive"&& expo <=5000){ expo=5000};
  // if(mvClass.includes("Private")&& expo<=2500){ expo=2500};
  // if(mvClass.includes("Private")&&coverType=="Comprehensive"&& expo<=2500){ expo=2500};
  // if(insurer=="Fidelity Shield  Insurance Co. Ltd" & expo<=5000){ expo=5000};
   basicPremium =(newSumInsured*(NewRate/100));
  if(mvClass.includes("Private")&&coverType=="Comprehensive" && basicPremium<=20000){basicPremium=20000};
  if(coverType=="Third Party Fire and Theft"&& basicPremium<=15000){basicPremium=15000};
  if(coverType=="Third Party"){basicPremium = newSumInsured};
  // if(coverType=="Third Party"||coverType=="Third Party Fire and Theft"){expo=0}
      const subBasic = (basicPremium + expo + newPoliTe + newPerAcc + newOtherBe);
      const trainingLevy= (subBasic * 0.002);
      const PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      const  policy= new Policies({
        otherCharges:otherCharges,
        levy:trainingLevy,
        PHCF:PHCF,
        exPro:excessProtector,
        clientId:clientId,
        signature:signature,
        remarks:remarks,
        basicPremium:basicPremium,
        rate:rate,
        branch:branch,
        stampDuty: stampDuty,
        netProfit:GrandTotal,
        policytype: policytype,
        policyName: policyName,
        coverType: coverType,
        mvClass: mvClass,
        vehicleId:vehicleId,
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
        GrandTotal:GrandTotal,
      });
        policy.save();
    
    res.redirect("/underwriting")


  };
  exports.getNewNonMotor= (req,res,next) =>{
    const user = req.user;
    Clients.findAll().then(clients=>{
      res.render('new-non-motor', {
        user:user,
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
  task: "Created a Non Motor policy",
  userId: user.id,
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
    let sumInsuredBetter=req.body.sumInsuredPoa;
    let basicSum=req.body.sumInsuredPoa
    if(coverType=="Work Injury Benefit"|| coverType== "Personal Accident"  || coverType=="Group Personal Accident")
    {sumInsuredBetter=req.body.sum_insured_better};
    const insurer =req.body.insurer;
    let PAL = req.body.PAL;
    let MP = req.body.MP;
    let PVT= req.body.PVT;
    let TPL=req.body.TPL;
    let newStampDuty = (stampDuty-0) || 0;
    let NewRate = (rate-0) || 1;
    let newSumInsured=(sumInsuredBetter-0) || 0;
    let newBasicSum=(basicSum-0) || 0;
    let newPAL= (PAL-0) || 0;
    let newMP = (MP-0) || 0;
    let newPVT= (PVT-0) || 0;
    let newTPL= (TPL-0) || 0;
    let basicPremium = (newSumInsured *(NewRate/100));
    if(coverType=="Work Injury Benefit"|| coverType== "Personal Accident"  || coverType=="Group Personal Accident"){basicPremium=newBasicSum};
    
      let subBasic = (basicPremium +newPAL+newMP+newPVT+newTPL);
      let trainingLevy= (subBasic * 0.002);
      let PHCF = (subBasic * 0.0025);
      const GrandTotal = (newStampDuty + trainingLevy + PHCF + subBasic);
      const policy= new Policies({
        basicPremium:basicPremium,
        regN:regN,
        chassis:chassisN,
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
        sumInsured: sumInsuredBetter,
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
   const name = user.firstName;
   Credit.findAll({where:{policyId:policyId}}).then(credits=>{
     Policies.findOne({where:{id:policyId},include:[{model:Clients},{model:Vehicles}]}).then(
      policy=>{
        const GrandTotal = policy.GrandTotal;
        const i =credits.length;
        let t_paid=0;
        let x=0;
        for(x=0;x<i;x++){
             t_paid+=credits[x].p_paid;
        }
        const pending=GrandTotal-t_paid;
        let otherCharges=policy.otherCharges;
        let  PVT=policy.PVT;
        let   MP=policy.MP;
        let   PAL=policy.PAL;
        let   TPL=policy.TPL; 
        let   poliTe=policy.poliTe;
        let   perAcc=policy.perAcc;
        let   pll=policy.pll;
        let   Windscreen= policy.windscreen;
        let   rescueBenefit= policy.rescueBenefit;
        let   lossOfUse =policy.lossOfUse; 
        let  basicPremium =policy.basicPremium;
        let exPro =policy.exPro
        newbasicPremium=(basicPremium-0)||0;
        otherCharges=(otherCharges-0)||0;
        lossOfUse=(lossOfUse-0)||0;
        Windscreen=(Windscreen-0)||0;
        pll=(pll-0)||0;
        perAcc=(perAcc-0)||0;
        poliTe=(poliTe-0)||0;
        TPL=(TPL-0)||0;
        PAL=(PAL-0)||0;
        MP=(MP-0)||0;
        PVT=(PVT-0)||0;
        exPro=(exPro-0)||0;
        if(policy.policytype == 'Motor vehicles'){
        const subBasic = (newbasicPremium +poliTe+perAcc+pll+Windscreen+rescueBenefit+lossOfUse+exPro);
        
        res.render('motor-view',{
          user:user,
          poliTe:poliTe,
          perAcc:perAcc,
          otherCharges:otherCharges,
          subBasic:subBasic,
          pll:pll,
          pending:pending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          name:name,
          policy:policy,
          Windscreen: Windscreen,
          rescueBenefit: rescueBenefit,
          lossOfUse :lossOfUse,
            pageTitle: 'motor-view',
            path:'/motor-view',
        });
        }else{
          
        const subBasic = (newbasicPremium +PAL+MP+PVT+TPL);
          res.render('non-motor-view',{
            user:user,
            PVT:PVT,
            MP:MP,
            PAL:PAL,
            name:name,
            subBasic:subBasic,
            pending:pending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            TPL:TPL,
            user:user ,
            policy:policy,
              pageTitle: 'non-motor-view',
              path:'/non-motor-view',
          });
  
        }
      }
    ).catch(err=>{
      console.log(err);
    })
   
   }).catch(err=>console.log(err))  
  };
  exports.getdeletePolicy = (req, res, next) => {
    const policyId = req.params.clientId;
    Policies.findByPk(policyId)
      .then(policy => {
        policy.delete="1";
        policy.save()
      })
      .then(result => {
        res.redirect('/underwriting');
      })
      .catch(err => console.log(err));
  };