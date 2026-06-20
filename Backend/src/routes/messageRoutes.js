import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

sendMessage,

getMessages,

getMyChats,

deleteMessage,

} from "../controllers/messageController.js";

const router =
express.Router();

/* SEND MESSAGE */

router.post(

"/",

protect,

sendMessage

);

/* ALL MY CHATS */

router.get(

"/my-chats",

protect,

getMyChats

);

/* DELETE MESSAGE */

router.delete(

"/:id",

protect,

deleteMessage

);

/* SINGLE CONVERSATION */

router.get(

"/:productId/:userId",

protect,

getMessages

);

export default router;