const express = require('express');

const session = require('express-session');

const flash = require('connect-flash');

const bodyParser = require('body-parser');

const Sequelize = require('./util/database');

const path = require('path');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const User =require('./models/User');

const Claims =require('./models/Claims');

const Clients =require('./models/Client');

const Logs =require('./models/Logs');

const Motor =require('./models/Motor');

const NonMotor =require('./models/NonMotor');

const Vehicle =require('./models/Vehicle');

const ReMotor =require('./models/ReMotor');

const ReNonMotor =require('./models/ReNonMotor');

const homeRoutes = require('./routes/home');

const clientRoutes = require("./routes/client");

const vehicleRoutes = require("./routes/vehicle");

const UnderwritingRoutes = require("./routes/underwriting");

const app= express();

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(
    session({
      secret: "endeavors",
      resave: false,
      saveUninitialized: false,
      store: new SequelizeStore({ db: Sequelize }),
      resave: false,
      proxy: true,
    })
  ); 
  app.use(flash());
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findByPk(req.session.user.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => console.log(err));
  });
  
  app.use(homeRoutes);
  
  app.use(clientRoutes);
  
  app.use(vehicleRoutes);

  app.use(UnderwritingRoutes);
  
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static(path.join(__dirname, "images")));
  
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findByPk(req.session.user.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });

Logs.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Logs);
Motor.belongsTo(Clients,{constraints: true, onDelete: "CASCADE"});
Clients.hasMany(Motor);
NonMotor.belongsTo(Clients,{constraints: true, onDelete: "CASCADE"});
Clients.hasMany(NonMotor);
Claims.belongsTo(Motor,({constraints: true, onDelete:"CASCADE"}));
Motor.hasMany(Claims);
Claims.belongsTo(NonMotor,({constraints: true, onDelete:"CASCADE"}));
NonMotor.hasMany(Claims);
ReMotor.belongsTo(Motor,({constraints: true, onDelete:"CASCADE"}));
Motor.hasMany(ReMotor);
ReNonMotor.belongsTo(NonMotor,({constraints: true, onDelete:"CASCADE"}));
NonMotor.hasMany(ReNonMotor);
Vehicle.belongsTo(Motor,({constraints: true, onDelete:"CASCADE"}));
Motor.hasMany(Vehicle);

Sequelize
.sync({alter:true})
.then((callback)=>{
    app.listen(3000,'0.0.0.0');  
}).catch(err=>{
    console.log(err)
})
