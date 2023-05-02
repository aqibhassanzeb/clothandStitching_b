import mongoose from 'mongoose'
const unSorder = new mongoose.Schema({
    shalwar:{
        type:String, 
    },
    neck:{
        type:String,
    },
    pocket:{
        type:String,
    },
    daman:{
        type:String
    },
    wrist:{
        type:String
    },
    chest_len:{
        type:String,
    },
    shoulder_len:{
        type:Number,
    },
    sleeve_len:{
        type:String
    },
    torso_len:{
        type:String,
    },
    bicep_len:{
        type:String,
    },
    shalwar_len:{
        type:String,
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const unstitchedOrder = mongoose.model('unstitchedOrder', unSorder)
