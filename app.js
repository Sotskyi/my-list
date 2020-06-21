const express = require("express");
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 const dotenv= require('dotenv');
const getData=require('./modules/scraper');
const connectDB = require('./config/db');
const addWords= require('./router/addWords');
const path=require('path');
dotenv.config({path:'./config/config.env'})
const PORT =process.env.PORT||5000
app.use(express.json());
app.use('/api',addWords);


if(process.env.NODE_ENV==='production'){app.use("/",express.static(path.join(__dirname,"client","build")));
require('dotenv').config({path:'./config/config.env'})


 app.get("*",(req,res)=>{
   res.sendFile(path.resolve(__dirname,"client","build","index.html"))



 })}
 







connectDB()
app.use(express.static("client"));



app.use( express.json());


app.listen(PORT,()=>console.log("app start in 5000"))