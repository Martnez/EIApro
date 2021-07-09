const Policies= require('../models/policy');
const Clients =require('../models/Client');
const Vehicles = require('../models/Vehicle');
const Credit = require('../models/creditCollection');
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
            res.render('insurancePayment', {
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
                path: '/insurancePayment'
            })
        }
        ).catch(err=>(console.log(err)))
    }).catch(err=>console.log(err))
}