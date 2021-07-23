const Policies= require('../models/policy');
const Clients =require('../models/Client');
const Vehicles = require('../models/Vehicle');
const Credit = require('../models/creditCollection');
const insurancePayment = require('../models/insurancePayment');
const creditPayment = require('../models/creditPayment');
const Logs =require('../models/Logs');
const Policy = require('../models/policy');

exports.getCredit=(req,res,next)=>{
const policyId=req.params.policyId;
const user = req.user;
Policies.findOne({where:{id:policyId},include:{model:Clients}}).then(policy=>{
    Credit.findAll({include:{model:Policies,where:{id:policyId},include:{model:Clients}}}).then(credit=>{
        const firstName = policy.client.firstName;
        const lastName = policy.client.lastName;
        const GrandTotal = policy.GrandTotal;
        const sumInsured= policy.sumInsured;
        const PHCF= policy.PHCF;
        const levy= policy.levy;
        const stampDuty = policy.stampDuty ;
        const i =credit.length;
        let t_paid=0;
        let x=0;
        for(x=0;x<i;x++){
             t_paid+=credit[x].p_paid;
        }
        console.log(t_paid);
        const pending=GrandTotal-t_paid;
        console.log(pending);
        res.render('credit_collection', {
            user:user ,
            policy:Policy,
            pending:pending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            lastName:lastName,
            firstName:firstName,
            GrandTotal:GrandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            sumInsured:sumInsured.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            PHCF:PHCF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            levy:levy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            stampDuty :stampDuty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            credit:credit,
            policyId:policyId,
            pageTitle: 'credit collection',
            path: '/credit_collection'
        })
    }
    ).catch(err=>(console.log(err)))
}).catch(err=>console.log(err))

}
exports.postCredit=(req,res,next)=>{
    const user =req.user
    const policyId = req.params.policyId;
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
  task: "Added a credit: ",
  userId: user.id,
  time: current_time,
  date:current_date
  });
    log.save();
let collectionFile =""
if(req.files.creditCollectFile !=undefined){collectionFile=req.files.creditCollectFile[0].originalname;}
const p_date= req.body.p_date;
const p_paid=req.body.p_paid;
const p_mode=req.body.p_mode;
const refNumber=req.body.refNumber;
console.log(refNumber);
const credit = new Credit({
    p_paid:p_paid,
    p_mode:p_mode,
    p_date:p_date,
    refNumber:refNumber,
    policyId:policyId,
    crediCollectionFile:collectionFile
})
credit.save()
   res.redirect(`/credit/${policyId}`)

}
exports.getInsurancePay = (req, res, next) => {
  const policyId = req.params.policyId;
  const user = req.user;
  Policies.findOne({
    where: { id: policyId },
    include: { model: creditPayment },
  })
    .then((xpolicy) => {
      const creditPay = xpolicy.creditPayments;
      Policies.findOne({ where: { id: policyId }, include: { model: Clients } })
        .then((policy) => {
          insurancePayment
            .findAll({
              
              include: {
                model: Policies,
                where: { id: policyId },
                include: { model: Clients },
              },
            })
            .then((insurancePay) => {
              let comm_rate = "";
              if (insurancePay[0] != undefined) {
                comm_rate = insurancePay[0].comm_rate;
              }
              let premium_rate =policy.rate;;
              if (insurancePay[0] != undefined) {
                premium_rate = insurancePay[0].premium_rate;
              }
              let comm_amount = "";
              if (insurancePay[0] != undefined) {
                comm_amount = insurancePay[0].comm_amount;
              }
              let special_disc = "";
              if (insurancePay[0] != undefined) {
                special_disc = insurancePay[0].special_disc;
              }
              const firstName = policy.client.firstName;
              const lastName = policy.client.lastName;
              const GrandTotal = policy.GrandTotal;
              const sumInsured = policy.sumInsured;
              const basicPremium = policy.basicPremium;
              const exPro = policy.exPro;
              const poliTe = policy.poliTe;
              const perAcc = policy.perAcc;
              const lossOfUse = policy.lossOfUse;
              const pll = policy.pll;
              const rescueBenefit = policy.rescueBenefit;
              const Windscreen = policy.Windscreen;
              const PVT = policy.PVT;
              const MP = policy.MP;
              const PAL = policy.PAL;
              const TPL = policy.TPL;
              const stampDuty = policy.stampDuty;

              res.render("insurancePayment", {
                user: user,
                policy: Policy,
                premium_rate:premium_rate,
                comm_rate: comm_rate,
                special_discount:special_disc,
                basicPremium: basicPremium,
                exPro: exPro,
                poliTe: poliTe,
                perAcc: perAcc,
                lossOfUse: lossOfUse,
                pll: pll,
                Windscreen: Windscreen,
                rescueBenefit: rescueBenefit,
                PVT: PVT,
                MP: MP,
                PAL: PAL,
                TPL: TPL,
                creditPay: creditPay,
                lastName: lastName,
                firstName: firstName,
                GrandTotal: GrandTotal.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                ),
                sumInsured: sumInsured
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                stampDuty: stampDuty,
                policyId: policyId,
                pageTitle: "credit collection",
                path: "/insurancePayment",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postInsurancePay =(req,res,next)=>{
    const user = req.user;
    const policyId= req.params.policyId;
    const comm_rate = req.body.comm_rate;
    const comm_amount = req.body.comm_amount;
    const special_disc = req.body.special_discount;
    const netPremium= req.body.netPremium;
    const basicPremium=req.body.basicPremium;
    const premium_rate= req.body.premium_rate;
    const PHCF= req.body.PHCF;
    const levy = req.body.levy;
    const stampDuty = req.body.stampDuty;
    insurancePayment.findOne({where:{policyId:policyId}})
    .then(pay=>{
      if(pay!=undefined){
        pay.comm_rate=comm_rate;
        pay.premium_rate=premium_rate;
        pay.netPremium=netPremium;
        pay.save();
        res.redirect(`/insurancePay/${policyId}`)
       
      }else{
    console.log(netPremium);
    console.log(comm_amount);
        const insurancePay =new insurancePayment({
          comm_rate:comm_rate,
          comm_amount:comm_amount,
          netPremium:netPremium,
          special_disc:special_disc,
          stampDuty:stampDuty,
          levy:levy,
          phcf:PHCF,
          basicPremium:basicPremium,
          premium_rate:premium_rate,
          policyId:policyId
      })
      insurancePay.save()
      res.redirect(`/insurancePay/${policyId}`)
      }
        
      })

}
exports.postCreditPay =(req,res,next)=>{
    const user = req.user;
    let payFile =""
    if(req.files.creditPayFile !=undefined){payFile=req.files.creditPayFile[0].originalname;}
    const policyId= req.params.policyId
    const p_paid = req.body.p_paid;
    const p_date = req.body.p_date;
    const p_mode = req.body.p_mode;
    const refNumber = req.body.refNumber;
    const creditPay =new creditPayment({
        p_paid:p_paid,
        p_date:p_date,
        p_mode:p_mode,
        refNumber:refNumber,
        policyId:policyId,
        creditPayFile:payFile
    })
    creditPay.save()
    res.redirect(`/insurancePay/${policyId}`)
}