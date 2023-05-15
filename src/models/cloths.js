import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    gallary_images:{
        type:[]
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId, ref: "clothbrand"
    },
    size:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    gender:{
        type:String,
        required:true
    },
    cloth_type:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const cloths = mongoose.model('cloths', UserSchema)
