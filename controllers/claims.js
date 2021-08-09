const Claim = require('../models/Claims');

const Policies= require('../models/policy');

const Clients =require('../models/Client');

const Logs = require('../models/Logs');

const insurancePay= require('../models/insurancePayment');

const claimAction= require('../models/claimAction');
const Vehicles = require('../models/Vehicle');

exports.deleteAction= async (req,res,next)=>{
  const claimActionId = req.params.claimActionId;
  const claimId=req.params.claimId;
  try{
  const claimAction_ = await claimAction.findOne({where:{id:claimActionId}});
  claimAction_.destroy();
  res.redirect(`/claim-action/${claimId}`)
  }catch{error=>console.log(error)}
}

exports.getClaims= (req,res,next) =>{ 
    const user = req.user;
Claim.findAll({where:{delete:'0'},order: [ [ 'createdAt', 'DESC']],include:{model:Policies,include:[{model:Clients},{model:Vehicles}]}}).then(claims=>{
    
    res.render('claims', {
        user:user,
          pageTitle: 'claims',
          claims:claims,
          path: '/claims',
        })
}).catch(err=>(console.log(err)))
      
  };
  exports.getNewClaim= (req,res,next) =>{
    policyType =req.params.policyType
    const user = req.user;
  Policies.findAll({include:[{model:Clients},{model:Vehicles}]}).then(policies=>{
    res.render('new-claim', {
        user:user,
          pageTitle: 'new-claim',
          policyType:policyType,
          policies:policies,
          path: '/new-claim',
        })
  })  
  };
  exports.postNewClaim=(req,res,next)=>{
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
task: "created a new claim",
userId: user.id,
time: current_time,
date:current_date
});
  log.save();
  const policyId= req.body.policyId;
  console.log(policyId);
  const reportDate = req.body.reportDate;
  const status= req.body.status;
  console.log(status);
  const signature = user.firstName;
  const compensation = req.body.comp;
  const lossDate = req.body.lossDate;
  const claimAmount = req.body.claimAmount;
  const claimType = req.body.claimType;
  const description = req.body.description;
  const offerAmount = req.body.offerAmount;
  const reporter = req.body.reporter;
  const offerDate = req.body.offerDate;
  const compDate = req.body.compDate;
  const reporterContact = req.body.reporterContact;
  const garagedAt = req.body.garagedAt;
  const garageContact = req.body.garageContact;
//   const clientName = req.body.clientName 
   const claim = new Claim({ 
     reportDate:reportDate,
     lossDate:lossDate,
     status_:status,
     signature:signature,
     claimAmount: claimAmount,
     claimType: claimType,
     offerAmount: offerAmount,
     reporter:reporter,
     offerDate: offerDate,
     compDate:compDate,
     reporterContact:reporterContact,
     garagedAt:garagedAt,
     compensation: compensation,
     garageContact:garageContact,
     description:description,
     policyId:policyId,
   })
   claim.save()
   res.redirect('/claims')

};
exports.getClaimView= (req,res,next) =>{
    const user = req.user;
    const name = user.firstName;
    const claimId = req.params.claimId;
    Claim.findOne({where:{id:claimId},include:[{model:Policies,include:{model:Clients}}]}).then(claim=>{
   console.log( claim.status_);
    res.render('claim-view', {
      user:user,
      name:name,
      claim:claim,
      status:claim.status_,
        pageTitle: 'claim-view',
        path: '/claim-view'
        
  })
   
  });
  
  };
exports.getClaimEdit= (req,res,next) =>{
    const user = req.user;
    const name = user.firstName;
    const claimId = req.params.claimId;
    Claim.findOne({where:{id:claimId},include:[{model:Policies,include:{model:Clients}}]}).then(claim=>{
  
    res.render('claim-edit', {
      user:user,
      name:name,
      claim:claim,
        pageTitle: 'claim-Edit',
        path: '/claim-edit'
        
  })
   
  });
  
  };
  exports.getClaimDocument= (req,res,next)=>{
    const claimId=req.params.claimId;
    const user = req.user;
    res.render('claim-documents', {
      user:user,
      claimId:claimId,
        pageTitle: 'claim-documents',
        path: '/claim-documents'
        
  })
  };
  exports.getdeleteClaim = (req, res, next) => {
    const claimId = req.params.claimId;
    Claim.findByPk(claimId)
      .then(claim => {
        claim.delete="1";
        claim.save()
      })
      .then(result => {
        res.redirect('/claims');
      })
      .catch(err => console.log(err));
  };
  exports.postClaimEdit = (req, res, next) => {
    const claimId = req.params.claimId;
    const claimAmount =req.body.claimAmount;
    const offerAmount =req.body.offerAmount;
    const compDate =req.body.compDate;
    const offerDate =req.body.offerDate;
    const description=req.body.description;
    const claimType= req.body.claimType;
    const status=req.body.status;
    console.log(status);
    Claim.findByPk(claimId)
      .then(claim => {
        claim.claimAmount=claimAmount;
        claim.offerAmount=offerAmount;
        claim.description=description;
        claim.claimType=claimType;
        claim.compDate=compDate;
        claim.offerDate=offerDate;
        claim.status_=status;
        claim.save()
      })
      .then(result => {
        res.redirect(`/claim-view/${claimId}`);
      })
      .catch(err => console.log(err));
  };
  
  exports.getClaimAction= async (req,res,next) =>{
    const user = req.user;
    const name = user.firstName;
    const claimId = req.params.claimId;
  const claim= await Claim.findOne({where:{id:claimId},include:[{model:Policies,include:{model:Clients}}]});
  const claimActions=await claimAction.findAll({where:{claimId:claimId}});
    res.render('claim-action', {
      user:user,
      name:name,
      claimActions:claimActions,
      claim:claim,
        pageTitle: 'claim-action',
        path: '/claim-action'
        
  })
  };
  exports.postClaimAction=(req,res,next)=>{
    const claimId = req.params.claimId;
    const setdate=req.body.setdate;
    const reporter=req.body.reporter;
    const action=req.body.action;
    const claimAction_= new claimAction({
     claimId:claimId,
     reporter:reporter,
     setdate:setdate,
     action:action
    });
    claimAction_.save();
    res.redirect(`/claim-action/${claimId}`)
  }