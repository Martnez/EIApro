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
})
credit.save()
   res.redirect(`/credit/${policyId}`)

}
exports.getInsurancePay=(req,res,next)=>{
    const policyId=req.params.policyId;
    const user = req.user;
    Policies.findOne({where:{id:policyId},include:[{model:insurancePayment},{model:creditPayment}]})
    .then(xpolicy=>{
    console.log(xpolicy.insurancePayments[0]);
    const creditPay=xpolicy.creditPayments;
    const comm_rate = xpolicy.insurancePayments[0].comm_rate;
    const comm_amount = xpolicy.insurancePayments[0].comm_amount;
    const ovr_rate = xpolicy.insurancePayments[0].ovr_rate;
    const ovr_amount =xpolicy.insurancePayments[0].ovr_amount;
    const special_disc = xpolicy.insurancePayments[0].special_disc;
        Policies.findOne({where:{id:policyId},include:{model:Clients}}).then(policy=>{
            Credit.findAll({include:{model:Policies,where:{id:policyId},include:{model:Clients}}}).then(credit=>{
                const firstName = policy.client.firstName;
                const lastName = policy.client.lastName;
                const GrandTotal = policy.GrandTotal;
                const sumInsured= policy.sumInsured;
                const basicPremium= policy.basicPremium;
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
                res.render('insurancePayment', {
                    user:user ,
                    policy:Policy,
                    creditPay:creditPay,
                    comm_rate:comm_rate,
                    comm_amount:comm_amount,
                    basicPremium:basicPremium,
                    ovr_amount:ovr_amount,
                    ovr_rate :ovr_rate ,
                    special_disc:special_disc,
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
                    path: '/insurancePayment'
                })
            }
            ).catch(err=>(console.log(err)))
        }).catch(err=>console.log(err))

    }).catch(err=>console.log(err));
   
};
exports.postInsurancePay =(req,res,next)=>{
    const user = req.user;
    const policyId= req.params.policyId;
    const comm_rate = req.body.comm_rate;
    const comm_amount = req.body.comm_amount;
    const ovr_rate = req.body.ovr_rate;
    const ovr_amount = req.body.ovr_amount;
    const special_disc = req.body.special_disc;
    const insurancePay =new insurancePayment({
        comm_rate:comm_rate,
        comm_amount:comm_amount,
        ovr_rate:ovr_rate,
        ovr_amount:ovr_amount,
        special_disc:special_disc,
        policyId:policyId
    })
    insurancePay.save()
    res.redirect(`/insurancePay/${policyId}`)
}
exports.postCreditPay =(req,res,next)=>{
    const user = req.user;
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
        policyId:policyId
    })
    creditPay.save()
    res.redirect(`/insurancePay/${policyId}`)
}