// import * as express  from 'express';
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MONGO from "../config/config";
//import { MongoClient } from "mongodb";
import { userRouter, tripRouter, tokenRouter, googleRouter } from "@router";

//const client = new MongoClient(MONGO.url);
const port = process.env.PORT;
// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect(MONGO.url, (err: Error, db: any) => {
//   if (err) throw err;

//   //Retrieve your chosen database
//   let dbo = db.db("myFirstDatabase");

//   /*  Create a mongodb index to remove any document with 'createdAt'
//      field every 30 seconds.
//  */
//   dbo
//     .collection("nonUsers")
//     .createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 30 },
//       (err: Error, dbResult: any) => {
//         if (err) throw err;
//         console.log("Index Created");
//         db.close();
//       }
//     );
// });

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    //origin : true
    methods: "GET, POST, OPTIONS, DELETE",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/trip", tripRouter);
app.use("/token", tokenRouter);
app.use("/auth", googleRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(201).send("서버는 서버서버해서 서버야");
});

let collection: any;

app.listen(port, async () => {
  console.log("start server");
});

mongoose
  .connect(MONGO.url, MONGO.options)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
