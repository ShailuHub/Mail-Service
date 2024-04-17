import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { authRouter, mailRouter } from "./routes/index";
import sequelize from "./database/database";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
const PORT: number = Number(process.env.PORT) || 3000;
//All Middleware
// Set up body parsing for JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/user", authRouter);
app.use("/api/mail", mailRouter);

const startServer = async () => {
  try {
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server is working on the port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
