import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";

import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* MIDDLEWARE */

app.use(

  cors({

    origin: "*",

  })

);

app.use(

  express.json()

);

/* ROUTES */

app.use(

  "/api/auth",

  authRoutes

);

app.use(

  "/api/products",

  productRoutes

);

app.use(

  "/api/messages",

  messageRoutes

);

app.get(

  "/",

  (req, res) => {

    res.send(

      "CampusCart API Running 🚀"

    );

  }

);

/* HTTP SERVER */

const server =

http.createServer(

  app

);

/* SOCKET SERVER */

const io = new Server(

  server,

  {

    cors: {

      origin: "*",

      methods: [

        "GET",

        "POST",

      ],

    },

  }

);

const onlineUsers = {};

/* SOCKET CONNECTION */

io.on(

  "connection",

  (socket) => {

    console.log(

      "✅ User Connected:",

      socket.id

    );

    /* USER ONLINE */

    socket.on(

      "user_online",

      (userId) => {

        onlineUsers[userId] =

          socket.id;

        io.emit(

          "online_users",

          Object.keys(

            onlineUsers

          )

        );

      }

    );

    /* JOIN ROOM */

    socket.on(

      "join",

      (userId) => {

        socket.join(

          userId

        );

      }

    );

    /* SEND MESSAGE */

    socket.on(

      "send_message",

      (receiverId) => {

        io.to(

          receiverId

        ).emit(

          "receive_message"

        );

      }

    );

    /* TYPING */

    socket.on(

      "typing",

      (data) => {

        io.to(

          data.receiverId

        ).emit(

          "user_typing",

          data

        );

      }

    );

    /* STOP TYPING */

    socket.on(

      "stop_typing",

      (receiverId) => {

        io.to(

          receiverId

        ).emit(

          "user_stop_typing"

        );

      }

    );

    /* DISCONNECT */

    socket.on(

      "disconnect",

      () => {

        for (

          const user in onlineUsers

        ) {

          if (

            onlineUsers[user] ===

            socket.id

          ) {

            delete onlineUsers[user];

          }

        }

        io.emit(

          "online_users",

          Object.keys(

            onlineUsers

          )

        );

        console.log(

          "❌ User Disconnected:",

          socket.id

        );

      }

    );

  }

);

/* SERVER START */

const PORT =

process.env.PORT ||

5000;

server.listen(

  PORT,

  () => {

    console.log(

      `🚀 Server running on port ${PORT}`

    );

  }

);