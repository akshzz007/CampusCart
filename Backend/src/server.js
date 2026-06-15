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

app.use(cors());

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send(
    "CampusCart API Running 🚀"
  );
});

/* SOCKET SERVER */

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: [
      "GET",
      "POST",
    ],
  },
});

io.on(
  "connection",
  (socket) => {
    console.log(
      "✅ User Connected:",
      socket.id
    );

    socket.on(
      "send_message",
      (data) => {
        console.log(
          "📩 Message:",
          data
        );

        io.emit(
          "receive_message",
          data
        );
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "❌ User Disconnected:",
          socket.id
        );
      }
    );
  }
);

/* START SERVER */

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});