import { User } from "../models/user.js"
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const userSignup = (req, res) => {
    const { status, email, password ,name} = req.body
    let image=req.file.filename
    if (!status || !email || !password || !name ) {
        return res.status(422).json({ error: "please fill all fields " })
    }
    User.findOne({ email })
        .then((saveUser) => {
            if (saveUser) {
                return res.status(422).json({ message: 'already registered' })
            }
            bycrypt.hash(password, 12)
                .then((hashedpassword) => {
                    const user = new User({
                        ...req.body,  password: hashedpassword,image
                      
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "register successfully" })
                        }).catch((err) => {
                            console.log(err)
                        })
                })
        }).catch((err) => {
            console.log(err)
        })
}

export const userLogin = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email or password " })
            }
            bycrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                      console.log("savedUser ;",savedUser)
                        savedUser.password=undefined 
                        res.json({ message: "Successfull Login", token,user:savedUser })
                    } else {
                        return res.status(422).json({ error: 'invalid email or password' })
                    }
                })
        })
        .catch(err => {
            console.log(err)
        })
}
export const userUpdate = async(req, res) => {
    const {_id} = req.params
        
        try {
            await  User.findByIdAndUpdate({_id },req.body)
               res.json({ message: "updated successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
export const userGet = async(req, res) => {
    let filter = {}
    if (req.query._id) {
        filter = { _id: req.query._id.split(','),isActive:true }
    }
        try {
            let result= await  User.find(filter).select("-password")
               res.json({success:true,data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
