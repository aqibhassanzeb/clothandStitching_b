import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
   
},{ timestamps: true })
export  const clothBrand = mongoose.model('clothbrand', UserSchema)
