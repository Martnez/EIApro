const User = require('../models/User');

const Logs = require('../models/Logs')

const Claims = require('../models/Claims');

const Vehicles = require('../models/Vehicle');

const bcrypt= require('bcrypt');

const Clients =require('../models/Client');

const crypto = require('crypto');

const Policy = require('../models/policy');

const {Op}=require('sequelize')

exports.getIndex=(req,res,next)=>{
    res.render('index',{
        pageTitle:'home',
        path:'/home',
        errorMessage: req.flash('error'),

    })
};
exports.getDashboard= async (req,res,next)=>{
  const user = req.user;
 const claims= await Claims.findAll();
 const Policies_= await Policy.findAll();
 const Vehicles_= await Vehicles.findAll();
 const Clients_= await Clients.findAll();
 const log_= await Logs.findAll();
 const logLen= log_.length;
 const policies= await  Policy.findAll({where:{delete:'0'}, limit:3,order: [ [ 'createdAt', 'DESC' ]],include:[{model:Clients},{model:Vehicles}]});
 const claims_= await Claims.findAll({where:{delete:'0'},limit:3,order: [ [ 'createdAt', 'DESC']],include:{model:Policy,include:[{model:Clients},{model:Vehicles}]}});
 const allUsers =await User.findAll({where:{email:{[Op.ne]:['amohdkaranja@gmail.com']}},include:{model:Logs,where:{}}});
 console.log(allUsers[0].logs.length);
 const totalClaims =claims.length;
 const totalPolicies =Policies_.length;
 const totalVehicles =Vehicles_.length;
 const totalClients =Clients_.length;
const totalFeeds= (totalClaims+totalPolicies+totalVehicles+totalClients);
const policyPerecent=parseInt(((totalPolicies-0)/(totalFeeds-0))*100)
const claimsPerecent=parseInt((totalClaims/totalFeeds)*100);
const clientPerecent=parseInt((totalClients/totalFeeds)*100);
const vehiclesPerecent=parseInt((totalVehicles/totalFeeds)*100);

    res.render('dashboard',{
      totalClaims:totalClaims,
      totalPolicies:totalPolicies,
      totalVehicles:totalVehicles,
      totalClients:totalClients,
      totalFeeds:totalFeeds,
      policies:policies,
      allUsers:allUsers,
      logLen:logLen,
      claims:claims_,
      policyPerecent:policyPerecent,
      claimsPerecent:claimsPerecent,
      clientPerecent:clientPerecent,
      vehiclesPerecent:vehiclesPerecent,
      user:user,
        pageTitle:'dashboard',
        path:'/dashboard',

    })
};
exports.getNewUser=(req,res,next)=>{
  const user = req.user;
    User.findAll({order: [ [ 'createdAt', 'DESC' ]]})
    .then(users=>{
      res.render('new-user', {
        users: users,
        user:user,
        pageTitle: 'register Users',
        path: '/new-user',
        errorMessage: req.flash('email-error')
    })
    
   
  })
};
exports.postNewUser=(req,res,next)=>{
    const email =req.body.email;
    const firstName= req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const level = req.body.level;
    const endeavor= "1234";
    const password = endeavor.toString();
User.findOne({where:{email:email}}).then(user=>{
    if(user){
        req.flash('email-error',"the email you have entered already exists");
        return res.redirect('/new-user')
    }
    return bcrypt.hash(password,12);
}).then(hashedPassword=>{
    const user = new User({
        email: email,
        password: hashedPassword,
        phoneNumber:phone,
        firstName:firstName,
        lastName:lastName,
        userLevel:level
      });
       
    return user.save();
})
.then(aftersave=>{
    res.redirect('/new-user');
  }).catch(err => {
    console.log(err);
  });
};
exports.getUserProfileEdit=(req,res,next)=>{
  const userId = req.params.userId;
    const email =req.body.email;
    const firstName= req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phoneNumber;
    const level = req.body.userLevel;
User.findOne({where:{id:userId}}).then(user=>{
        user.email= email;
        user.phoneNumber=phone;
        user.firstName=firstName;
        user.lastName=lastName;
        user.userLevel=level;
        user.save();
        res.redirect('/new-user');
      });
};
exports.postIndex = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({where:{ email: email }})
      .then(user => {
        if (!user) {
    
          return  res.status(422).render('index', {
            pageTitle: 'home',
            path: '/',
            // linkMessage: req.flash('linkMessage'),
            errorMessage: req.flash('error'),
            // successMessage: req.flash('successMessage'),
            // resetNull: req.flash('resetNull'),
            // oldInputs:{email:email,password:password}
    });
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
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
                  task: "logged in",
                  userId: user.id,
                  date:current_date,
                  time:current_time
                  
                })
                    log.save();
                  
                    res.redirect('/dashboard')
               
              });
            }
            req.flash('error','Invalid email or Password!');
            res.redirect('/');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/');
          });
      })
      .catch(err => console.log(err)); 
};
exports.getAdmin=(req,res,next)=>{
  const user = req.user;
  res.render('admin',{
    user:user,
      pageTitle:'admin',
      path:'/admin',

  })
};

exports.getLogs= (req,res,next) =>{
  const user = req.user

  Logs.findAll({include:[{model:User}],order: [ [ 'createdAt', 'DESC' ]]})
  .then(logs=>{
    // console.log(logs);
    res.render('logs', {
      user:user ,
      logs: logs,
      pageTitle: 'logs',
      path: '/logs',
      // fetchError: req.flash('fetchError'),
    })
 
}).catch(err=>{console.log(err)});

};
exports.postLogout =(req,res,next)=>{ 
  const user = req.user;
  console.log(user);
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
      task: "logged out",
      userId: user.id,
      time: current_time,
      date:current_date
    });
        log.save();
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
    })

  
};
exports.getUserProfile= (req,res,next) =>{
  const user = req.user
const userId = req.params.userId;

User.findByPk(userId)
.then(user=>{
        if(!user){

          req.flash('fetchError','Unable to get user!');
          return res.redirect('/manage-users')
        }
        res.render('user-profile',{
            pageTitle: 'user-profile',
            path:'/user-profile-view',
            user: user,
            user:user,
            updateSuccess: req.flash('updateSuccess'),
            resetSuccess: req.flash('resetSuccess'),
        });
    }
).catch(err=> console.log(err));

};

exports.postResetFlag=(req,res,next)=>{
  const userId = req.params.userId;
  User.findByPk(userId).then(user=>{
     user.resetFlag = 0;
     return user.save()
  }).then(result=>{
    req.flash('resetSuccess','Reset succesifully done!');
    res.redirect(`/user-profile/${userId}`)
  })
  .catch(err=>console.log(err))

};
exports.postDeleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      
      return user.destroy();
    })
    .then(result => {
      res.redirect('/new-user');
    })
    .catch(err => console.log(err));
};