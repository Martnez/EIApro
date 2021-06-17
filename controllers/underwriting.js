const Motor= require('../models/Motor');
const NonMotor= require('../models/NonMotor');

exports.getUnderwriting= (req,res,next) =>{

    const user = req.user;
      res.render('underwriting', {
        userN:user,
          pageTitle: 'underwriting',
          path: '/underwriting',
        //   errorMessage: req.flash('emailError')
          
  })
  };
  exports.getNewMotor= (req,res,next) =>{

    const user = req.user;
      res.render('new-motor', {
        userN:user,
          pageTitle: 'new-motor',
          path: '/new-motor',
        //   errorMessage: req.flash('emailError')
          
  })
  };
  exports.getNewNonMotor= (req,res,next) =>{

    const user = req.user;
      res.render('new-non-motor', {
        userN:user,
          pageTitle: 'new-non-motor',
          path: '/new-non-motor',
        //   errorMessage: req.flash('emailError')
          
  })
  };