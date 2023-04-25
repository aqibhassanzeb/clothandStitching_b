import express from "express";
const routes = express.Router();

import {
    userSignup,
    userLogin,
} from "../controllers/auth_controller.js"

routes.post('/user_signup', userSignup)

routes.post('/user_login', userLogin)



export default routes