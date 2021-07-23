
const Policies= require('../models/policy');
const Clients =require('../models/Client');
const Vehicles = require('../models/Vehicle');
const insurancePayment = require('../models/insurancePayment');
exports.getReports= (req,res,next) =>{
    const user = req.user;
    Policies.findAll({where:{delete:'0'},order: [ [ 'clientId', 'DESC' ]],include:[{model:Clients},{model:Vehicles},{model:insurancePayment}]})
    .then(policies=>{
      res.render('credit', {
        user:user,
        policies:policies,
          pageTitle: 'credit',
          path: '/credit',
      })
        }).catch(err=>console.log(err))
  
    };
    exports.getPaymentList= (req,res,next) =>{
        const user = req.user;
          res.render('paymentlist', {
            user:user,
              pageTitle: 'paymentlist',
              path: '/paymentlist',
          })      
        };
    
    