const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const cookieParser=require('cookie-parser');
const app=express();
const cors=require('cors');
const connectToDb=require('./db/db');
const userRoutes=require('./routes/user.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectToDb();
app.use(cookieParser());

app.get('/',(req,res)=>{
       res.send("hello");
})
app.use('/users',userRoutes);  

module.exports=app;