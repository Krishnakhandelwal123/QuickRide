const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser=async(req,res,next)=>{
    
        
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const isblacklisted=await blacklistTokenModel.findOne({token:token});
        if(isblacklisted){
            return res.status(401).json({message:"unauthorized"});
        }
        try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Invalid token: user not found"});
        }
        req.user=user;
        next();
    }
    catch (error) {
        return res.status(401).json({message:"Invalid or expired token",error:error.message});
    }
}