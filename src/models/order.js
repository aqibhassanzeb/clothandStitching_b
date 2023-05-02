import mongoose from 'mongoose'
const Order = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId, ref: "cloths"
    },
    size:{
        type:String,
        required:true
    },
    total_price:{
        type:Number,
        required:true
    },
    order_type:{
        type:String,
        required:true
    },
    un_stitched:{
        type:mongoose.Schema.Types.ObjectId, ref: "unstitchedOrder"
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const order = mongoose.model('order', Order)
