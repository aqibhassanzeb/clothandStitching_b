import { clothBrand } from "../models/cloths_brand.js"
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { cloths } from "../models/cloths.js";

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

// cloths portion 

export const cloth_create = (req, res) => {
    const {name,brand,size,color,price,gender,cloth_type} = req.body
    let picture=req.file.filename
    if (!name || !brand || !size || !color || !price || !gender || !cloth_type ) {
        return res.status(422).json({ error: "please fill the name " })
    }
    cloths.findOne({ name })
        .then((already) => {
            if (already) {
                return res.status(422).json({ message: 'already exist' })
            }
                    const newClohts = new cloths({...req.body,image:picture})
                    newClohts.save()
                        .then(saved => {
                            res.status(200).json({success:true, message: "uploaded successfully" })
                        }).catch((err) => {
                            console.log(err)
                        })
               
        }).catch((err) => {
            console.log(err)
        })
}

export const cloth_Get = async(req, res) => {
    let filter = {}
    if (req.query._id) {
        filter = { _id: req.query._id.split(','),isActive:true }
    }
    if (req.query.brand) {
        filter = { brand: req.query.brand.split(','),isActive:true }
    }
    if (req.query.cloth_type) {
        filter = { cloth_type: req.query.cloth_type,isActive:true }
    }
    if (req.query.gender) {
        filter = { gender: req.query.gender,isActive:true }
    }
        try {
            const result= await cloths.find(filter).populate("brand")
               res.json({data:result})
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}

export const cloth_Update = async(req, res) => {
    const {_id} = req.params
        
        try {
            await cloths.findByIdAndUpdate({_id },req.body)
               res.json({ message: "updated successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}

export const cloth_Delete = async(req, res) => {
    const {_id} = req.params
        
        try {
         await cloths.findByIdAndDelete({_id })
               res.json({ message: "deleted successfully" })
        } catch (error) {
               res.status(400).json({ error: "something went wrong!" })
            
        }
     
}