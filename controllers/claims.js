const Claim = require('../models/Claims');

const Policies= require('../models/policy');

const Logs = require('../models/Logs');

const Clients =require('../models/Client');

const db = require('../util/datbase_s');

exports.getClaims= (req,res,next) =>{
    const user = req.user;
Claim.findAll({order: [ [ 'createdAt', 'DESC']],include:{model:Policies,include:{model:Clients}}}).then(claims=>{
    console.log(claims)
    res.render('claims', {
        userN:user,
          pageTitle: 'claims',
          claims:claims,
          path: '/claims',
        })
}).catch(err=>(console.log(err)))
      
  };
 
  exports.getNewClaim= (req,res,next) =>{
    const user = req.user;
  Policies.findAll().then(policies=>{
    res.render('new-claim', {
        userN:user,
          pageTitle: 'new-claim',
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
    const claimId = req.params.claimId;
    Claim.findOne({where:{id:claimId},include:[{model:Policies,include:{model:Clients}}]}).then(claim=>{
    res.render('claim-view', {
      userN:user,
      claim:claim,
        pageTitle: 'claim-view',
        path: '/claim-view',
        isAuthenticated: req.session.isLoggedIn,
        
  })
   
  });
  
  };