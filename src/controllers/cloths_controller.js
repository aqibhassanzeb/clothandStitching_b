import { clothBrand } from "../models/cloths_brand.js"
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const clothBrands_Create = (req, res) => {
    const {name} = req.body
    if (!name ) {
        return res.status(422).json({ error: "please fill the name " })
    }
    clothBrand.findOne({ name })
        .then((already) => {
            if (already) {
                return res.status(422).json({ message: 'already registered' })
            }
                    const brand = new clothBrand(req.body)
                    brand.save()
                        .then(brandsaved => {
                            res.json({ message: "register successfully" })
                        }).catch((err) => {
                            console.log(err)
                        })
               
        }).catch((err) => {
            console.log(err)
        })
}
export const clothBrands_Update = async(req, res) => {
    const {_id} = req.params
        
        try {
            await  clothBrand.findByIdAndUpdate({_id },req.body)
               res.json({ message: "updated successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
export const clothBrands_Get = async(req, res) => {
    let filter = {}
    if (req.query._id) {
        filter = { _id: req.query._id.split(','),isActive:true }
    }
        try {
            const result= await  clothBrand.find(filter)
               res.json({data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}
export const clothBrands_Delete = async(req, res) => {
    const {_id} = req.params
        
        try {
         await  clothBrand.findByIdAndDelete({_id })
               res.json({ message: "deleted successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}