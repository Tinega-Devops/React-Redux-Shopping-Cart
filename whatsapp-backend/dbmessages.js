import mongoose from "mongoose"

const whatsappSchema=mongoose.Schema({
    message:{
        type :String
    },
    name:{
        type:String
    },
    timestamp:{
        type:String
    },
    received:{
        type:Boolean
    }
})

export default mongoose.model("messagecontents",whatsappSchema);
