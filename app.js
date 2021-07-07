const express = require('express');

const session = require('express-session');

const flash = require('connect-flash');

const bodyParser = require('body-parser');

const Sequelize = require('./util/database');

const db =require('./util/datbase_s');
const mysql= require('mysql2');
const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password:"",
  database:'eia'
});
connection.connect();

const path = require('path');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const User =require('./models/User');

const Claims =require('./models/Claims');

const Clients =require('./models/Client');

const Logs =require('./models/Logs');

const Policies =require('./models/policy');

// const NonMotor =require('./models/NonMotor');

const Vehicle =require('./models/Vehicle');

const RePolicies =require('./models/RePolicy');

// const ReNonMotor =require('./models/ReNonMotor');

const homeRoutes = require('./routes/allRoutes');


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
  app.get('/search',function(req,res){
    connection.query('SELECT policyNumber FROM `policies` WHERE 1',
    function(err,rows,fields){
        if(err) throw err;
        var data=[];
        for(i=0;i<rows.length;i++){
            data.push(rows[i].policyNumber);
        }
        res.end(JSON.stringify(data))
        console.log(JSON.stringify(data));
    });
});
app.get('/secondSearch',function(req,res){
  connection.query('SELECT policytype, coverType from `policies` WHERE policyNumber= "CCBD/1200/01"',
  function(err,rows,fields){
    if(err) throw err;
    var data=[];
    for(i=0;i<rows.length;i++){
        data.push(rows[i].policytype);
        data.push(rows[i].coverType);
    }
    res.end(JSON.stringify(data))
    console.log(JSON.stringify(data));
} );
});

Logs.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Logs);
Policies.belongsTo(Clients,{constraints: true, onDelete: "CASCADE"});
Clients.hasMany(Policies);
RePolicies.belongsTo(Clients,{constraints: true, onDelete: "CASCADE"});
Clients.hasMany(RePolicies);
Claims.belongsTo(Policies,({constraints: true, onDelete:"CASCADE"}));
Policies.hasMany(Claims);
Claims.belongsTo(RePolicies,({constraints: true, onDelete:"CASCADE"}));
RePolicies.hasMany(Claims);
Policies.belongsTo(Vehicle,({constraints: true, onDelete:"CASCADE"}));
Vehicle.hasMany(Policies);
Vehicle.belongsTo(Clients,({constraints: true, onDelete:"CASCADE"}));
Clients.hasMany(Vehicle);


Sequelize
.sync({alter:true})
.then((callback)=>{
    app.listen(3000,'0.0.0.0');  
}).catch(err=>{
    console.log(err)
})
