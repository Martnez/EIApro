const Vehicles = require('../models/Vehicle');

const Logs = require('../models/Logs')

const Policy = require('../models/policy')

const Clients= require('../models/Client')

exports.getVehicles= (req,res,next) =>{
  const user = req.user;
  Vehicles.findAll({order: [ [ 'createdAt', 'DESC' ]]})
  .then(vehicle=>{
    res.render('vehicles', {
      userN:user ,
      vehicles: vehicle,
      pageTitle: 'vehicles page',
      path: '/vehicles',
  })
  .catch(err=>{console.log(err)});
 
})
  };
  exports.getNewVehicle= (req,res,next) =>{
    const user = req.user;
    res.render("new-vehicle",{
      userN:user,
      pageTitle:"vehicle registration",
      path:"/new-vehicle"
    })
   
    
  };
  exports.getVehicleView= (req,res,next) =>{
    const user = req.user;
    const vehicleId= req.params.vehicleId
    Vehicles.findOne({where:{id:vehicleId},include:{model: Policy,include:{model:Clients}}}).then(
      vehicle=>{
      res.render('vehicle-view', {
        userN:user,
        vehicle:vehicle,
          pageTitle: 'vehicle-view',
          path: '/vehicle-view',
        //   errorMessage: req.flash('emailError')
          
  })
}
).catch(err=>(console.log(err)))
  };
  exports.postNewVehicle=(req,res,next)=>{
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
  userId: user._id,
  time: current_time,
  date:current_date
  });
    log.save();
    
  const regN = req.body.regN;
  const chassisN = req.body.chassisN;
  const logbookN = req.body.logbookN;
  const make = req.body.make;
  const yom = req.body.yom;
  const engineN = req.body.engineN;
  const color = req.body.color;
  const loadingCapacity= req.body.loadingCapacity;
  const owner = req.body.owner;
 
  const vehicle = new Vehicles({
      RegN:regN,
      Chasis:chassisN,
      LogBook:logbookN,
      Make:make,
      MOY:yom,
      EngNo:engineN,
      Color:color,
      LoadingCapacity:loadingCapacity,
      Owner:owner
  })
  vehicle.save();
  return res.redirect('/vehicles')
  };