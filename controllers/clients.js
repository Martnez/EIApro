const Clients =require('../models/Client');

const Policy= require('../models/policy');

const Logs = require('../models/Logs')

exports.getClients=(req,res,next)=>{
    const user = req.user;
        Clients.findAll({where:{delete:'0'},order: [ [ 'createdAt', 'DESC' ]]})
        .then(clients=>{
          res.render('clients', {
            user:user ,
            clients: clients,
            pageTitle: 'clients page',
            path: '/clients',
            errorMessage: req.flash('email-error')
        })
        .catch(err=>{console.log(err)});
       
      })
  };
  exports.getNewClient= (req,res,next) =>{

    const user = req.user;
      res.render('new-client', {
        user:user,
          pageTitle: 'new client',
          path: '/new-client',
          errorMessage: req.flash('emailError')
          
  })
  };
  exports.postClient=(req,res,next)=>{
    const user = req.user;
    const signature = user.firstName;
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
  task: "Created new client",
  userId: user.id,
  time: current_time,
  date:current_date
  });
    log.save();
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber= req.body.phoneNumber;
    const city= req.body.city;
    const boxOffice= req.body.boxOffice;
    const email = req.body.email;
    const idNumber= req.body.idNumber;
    console.log(idNumber)
    const businessType= req.body.businessType;
    const businessNature = req.body.businessNature;
    const pin = req.body.pin;
    const regNumber=  "EIA/CP/08/2021";
    const level = req.body.level;
    const contactPerson = req.body.contactPerson;
    const contactPersonNumber = req.body.contactPhone;
    
    Clients.findOne({where:{email: email}})
    .then(client => {
      if (client) {
        req.flash('emailError','client with  this email already exist!');
        return res.redirect('/new-client');
      }
    }).then(result=>{
       
      const client = new Clients({
        email: email,
        phoneNumber:phoneNumber,
        firstName:firstName,
        lastName:lastName,
        signature:signature,
        town: city,
        regNumber:regNumber,
        boxOffice:boxOffice,
        idNumber: idNumber,
        businessType:businessType,
        businessNature:businessNature,
        pin:pin,
        regNumber:regNumber,
        level:level,
        contactPerson: contactPerson,
        contactPersonNumber: contactPersonNumber
    
      });
      return client.save().then(data=>{
        
      });
  
    }).then(aftersave=>{
      res.redirect('/clients');
    })
    .catch(err => {
      console.log(err);
    });
  
  
  
  };
  exports.getClientProfile=(req,res,next)=>{
    const user = req.user;
    const name = user.firstName;
    const clientId = req.params.clientId;
    Clients.findOne({where:{id:clientId},include:{model:Policy}})
    .then(clients=>{
      
      const policies =clients.policies;
      res.render('client-profile',{
        user:user,
        name:name,
          pageTitle: 'client-profile',
          path:'/client-profile',
          clientId:clientId,
          policies: policies,
          client:clients,
      });
    }).catch(err=>{console.log(err);})
        


  }
  exports.getdeleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    Clients.findByPk(clientId)
      .then(client => {
        client.delete="1"
        client.save()
      })
      .then(result => {
        res.redirect('/clients');
      })
      .catch(err => console.log(err));
  };