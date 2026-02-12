const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const cookieParser=require('cookie-parser');
const app=express();
const cors=require('cors');
const connectToDb=require('./db/db');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
const mapsRoutes=require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));
// allow Authorization header and common methods for preflight
corsOptions.allowedHeaders = ['Content-Type', 'Authorization'];
corsOptions.methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
connectToDb();
app.use(cookieParser());


 
app.get('/',(req,res)=>{
       res.send("hello");
})
app.use('/users',userRoutes);  
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);


module.exports=app;