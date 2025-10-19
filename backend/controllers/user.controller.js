const userModel=require('../models/user.model'); 
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')
const blacklistTokenModel=require('../models/blacklistToken.model');


module.exports.registerUser=async(req,res,next)=>{
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
      const {fullname,email,password}=req.body;
      const isUserExist=await userModel.findOne({email});
      if(isUserExist){
        return res.status(400).json({message:"User already exists"})
      }
      const hashedPassword=await userModel.hashPassword(password);

      const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
      })
       const token=await user.generateAuthToken();

       const userResponse = {
         _id: user._id,
         fullname: user.fullname,
         email: user.email
       };

       res.status(201).json({user: userResponse, token});
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

module.exports.loginUser=async(req,res,next)=>{
  try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');
    if(!user){
      return res.status(401).json({message:"Invalid email or password"})
    } 
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid email or password"})
    }
    const token=await user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',maxAge:3600000 });
    res.status(200).json({user, token});
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

module.exports.getUserProfile=async(req,res,next)=>{
  res.status(200).json({user:req.user});
 }

module.exports.logoutUser=async(req,res,next)=>{
   res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });
 }