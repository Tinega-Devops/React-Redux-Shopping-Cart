// importing
import express from "express"
import mongoose from "mongoose"

//app config

const app =express()
const port= process.env.PORT || 9000;
//middleware 

//DB
const mongodb_url="mongodb+srv://admin:cl5Ndt0l4Ss5sdSh@cluster0.cinw8.mongodb.net/whatsapp-db?retryWrites=true&w=majority";
const db=mongoose.connect(mongodb_url, { useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true });


// ??????

// api routes

app.get("/",(req , res)=>res.status(200).send("Hellow World"));

// Listen

app.listen(port,()=>console.log(`Listening on locahost:${port}`))