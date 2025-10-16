const userModel=require('../models/user.model'); 
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')


module.exports.registerUser=async(req,res,next)=>{
    try {
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
      const {fullname,email,password}=req.body;
      const hashedPassword=await userModel.hashPassword(password);

      const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
      })
       const token=await user.generateAuthToken();

       // Avoid sending the password back, even if it's hashed.
       const userResponse = {
         _id: user._id,
         fullname: user.fullname,
         email: user.email
       };

       res.status(201).json({user: userResponse, token});
    } catch (error) {
      // You can add more specific error handling here, e.g., for duplicate emails
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
}