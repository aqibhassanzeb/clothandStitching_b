import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    status: {
        type: String,
        required: true,
        enum:['admin','user','tailor']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type:String
    },
    fix_pay:{
        type:Number
    },
    image:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    detail:{
        type:String
    },
    email_verified:{
        type:Boolean,
        default:false
    }
},{ timestamps: true })
export  const User = mongoose.model('user', UserSchema)
