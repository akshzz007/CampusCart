import express from "express";

import {

registerUser,

loginUser,

getMe,

googleAuth,

} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router =

express.Router();

/* REGISTER */

router.post(

"/register",

registerUser

);

/* LOGIN */

router.post(

"/login",

loginUser

);

/* GOOGLE AUTH */

router.post(

"/google-auth",

googleAuth

);

/* GET USER */

router.get(

"/me",

protect,

getMe

);

export default router;