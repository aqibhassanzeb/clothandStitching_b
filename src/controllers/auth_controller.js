import { User } from "../models/user.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import { sendMail } from "../middleware/email_send.js";

export const userSignup = (req, res) => {
  const { status, email, password, name } = req.body;
  let image = req.file?.filename;
  if (!status || !email || !password || !name) {
    return res.status(422).json({ error: "please fill all fields " });
  }
  User.findOne({ email })
    .then((saveUser) => {
      if (saveUser) {
        return res.status(422).json({ message: "already registered" });
      }
      bycrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          ...req.body,
          password: hashedpassword,
          image,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "register successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


export const userLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "invalid email or password " });
      }
      bycrypt.compare(password, savedUser.password).then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign(
            { _id: savedUser._id },
            process.env.JWT_SECRET
          );
          savedUser.password = undefined;
          res.json({ message: "Successfull Login", token, user: savedUser });
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


export const userUpdate = async (req, res) => {
  const { _id } = req.params;
  const {password}=req.body
  let passwordUpdate=false
  let newPassword
  if(password){
  passwordUpdate=true
  newPassword=await bycrypt.hash(password, 12)
  }
  try {
    const updateData = passwordUpdate ? { ...req.body, password: newPassword } : req.body;
    await User.findByIdAndUpdate(_id, updateData);
    res.json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};


export const userGet = async (req, res) => {
  let filter = {isActive: true };
  if (req.query._id) {
    filter._id= req.query._id.split(",")
  }
  try {
    let result = await User.find(filter).select("-password");
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ error: "something went wrong!" });
  }
};

//   forgot password

export const forgotPass = async(req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ error: "please enter email" });
    }
    try {
    let buffer=crypto.randomBytes(32)
    const token = buffer.toString("hex");
  let user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res
          .status(422)
          .json({ error: "user do not exist with this email" });
      }
      user.resetToken = token;
      let expireToken = Date.now() + 3600000;
      let _id=user._id
      console.log("user data :",user)
     let result= await User.findByIdAndUpdate({_id},{resetToken:token,expireToken})
     if(result){
      await sendMail(
              user.email,
              "Password Reset",
              `<h2>click in this <a href="${process.env.LINK}reset-pass/${token}">link</a> to reset password</h2>`
            )
              
           return  res.status(200).json({ message: "check your email" });  
     }  
    } catch (error) {
        res.status(400).json({error:"something went wrong!"})
    }
};

// new password

export const newPass = (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(422).json({ error: "please enter password" });
    }
  const d = new Date();
  let time = d.getTime();
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })

    .then((user) => {
      console.log("user :", user);
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bycrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
