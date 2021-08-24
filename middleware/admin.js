
const User = require('../models/User');
module.exports= async (req,res,next)=>{
 const userId=req.user.id;
 const user= await User.findOne({where:{id:userId}});
 const userLvl=user.userLevel;
    if(userLvl!="Admin"){
        return res.redirect('/dashboard')
    }
    next();
}