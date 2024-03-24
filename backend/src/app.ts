import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { authRouter, mailRouter } from "./routes/index";
import sequelize from "./database/database";
const app = express();

//All Middleware
// Set up body parsing for JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/user", authRouter);
app.use("/api/mail", mailRouter);

const PORT: number = Number(process.env.PORT) || 3000;
const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is working on the port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
