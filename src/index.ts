// import * as express  from 'express';
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const { MONGO_DATABASE, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

// import userRouter from '@userRouter';
// import userRouter = require('@userRouter')
import { userRouter, tripRouter } from "@router";
// import userRouter = require("../router/user");

// const userRouter = express.Router();
// const tripRouter = express.Router();

const port = 4000;

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
let server;
app.listen(port, () => {
  console.log("start server");
});

mongoose
  .connect(
    //`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.8ojkq.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`,
    "mongodb+srv://sumsum:republicramen@cluster0.8ojkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// mongoose.connect(
//   // "mongodb+srv://sumsum:republicramen@cluster0.8ojkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//   "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.wgtfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// );
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function callback() {
//   console.log("mongo db connection OK.");
// });
