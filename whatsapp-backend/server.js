// importing
import express from "express"
import mongoose from "mongoose"
import Message from "./dbmessages.js"
import pusher from "pusher"


//app config

const app =express()
const port= process.env.PORT || 9000;
const Pusher=new pusher({
    
app_id :"1072720",
key : "982ef6514bd151a7cc0c",
secret : "3eb0ac7ee4958b22bf72",
cluster : "eu",
encrypted:true

})
//middleware 
app.use(express.json())
//DB
const mongodb_url="mongodb+srv://admin:cl5Ndt0l4Ss5sdSh@cluster0.cinw8.mongodb.net/whatsapp-db?retryWrites=true&w=majority";
mongoose.connect(mongodb_url, { useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology:true });

const db=mongoose.connection;
db.once("open",()=>{
    console.log("DB connected")
    const msgCollection=db.collection("messagecontents");
    const changeSteam=msgCollection.watch();
    changeSteam.on("change",(change)=>{
        console.log(change);
        if(change.operationType==="insert"){
            const messageDetails=change.fullDocument;
            Pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                message:messageDetails.Message,
            })
        }else{
            console.log("Error triggering Pusher");
        }
    })
})


// ??????

// api routes

app.get("/",(req , res)=>res.status(200).send("Hellow World"));

app.post("/messages/new",(req,res)=>{
    const dbMessage=req.body;
    Message.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(`new message created :\n ${data}`)
        }
    })
})

app.get("/messages/sync",(req,res)=>{
    Message.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send( data)
        }
    })
})
// Listen

app.listen(port,()=>console.log(`Listening on locahost:${port}`))