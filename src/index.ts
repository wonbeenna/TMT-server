// import * as express  from 'express';
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MONGO from "../config/config";
//const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

// import userRouter from '@userRouter';
// import userRouter = require('@userRouter')
import { userRouter, tripRouter } from "@router";
// import userRouter = require("../router/user");

// const userRouter = express.Router();
// const tripRouter = express.Router();

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    //origin : true
    methods: "GET, POST, OPTIONS",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/trip", tripRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(201).send("서버는 서버서버해서 서버야");
});

app.listen(port, () => {
  console.log("start server");
});

mongoose
  .connect(MONGO.url, MONGO.options)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
