const mongoose =require('mongoose');
const config= require('config');
const db_key =config.get('db');
const connectDB= async ()=>{
     try { 
         const conn= await mongoose.connect(db_key,{
             useNewUrlParser:true,
             useCreateIndex:true,
             useUnifiedTopology: true
         });
   console.log(`mongo db connected + ${conn.connection.host}`)
     }catch(err){
        console.log(`eroor+ ${err}`)
     }
}
module.exports=connectDB