// import * as express  from 'express';
import express, { Express } from "express";
import fs from "fs";
import https from "https";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MONGO from "../config/config";
import { MongoClient } from "mongodb";
import { userRouter, tripRouter, tokenRouter, googleRouter } from "@router";

//const indexer = require("../controller/trip/indexer");

const client = new MongoClient(MONGO.url);
const port = process.env.PORT;

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

// app.get("/search", async (req: Request, res: Response) => {
//   try {
//     let result = await collection
//       .aggregate([
//         {
//           $search: {
//             autocomplete: {
//               query: `${req.query.spot}`,
//               path: "place",
//             },
//           },
//         },
//       ])
//       .toArray();
//     res.status(200).send(result);
//   } catch (err) {
//     res.status(500).send({ message: "다시 시도해주시기 바랍니다." });
//   }
// });

let server: https.Server | Express;
let serverType = "";
if (
  fs.existsSync(__dirname + "/key.pem") &&
  fs.existsSync(__dirname + "/cert.pem")
) {
  server = https.createServer(
    {
      key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
      cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
    },
    app
  );
  serverType = "https";
} else {
  server = app;
  serverType = "http";
}

server.listen(port, async () => {
  console.log("start server");
  try {
    await client.connect();
    collection = client.db("myFirstDatabase").collection("dbs");
  } catch (err) {
    console.log(err);
  }
});

export default server;
// const data = {
//   elasticsearch: {
//     url: "http://localhost:",
//     port: "9200",
//     elasticsearchIndices: {
//       PLACE: {
//         index: "spot",
//         type: "SPOT",
//         collectionName: "dbs",
//       },
//     },
//   },
// };

mongoose
  .connect(MONGO.url, MONGO.options)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// const indexName = data.elasticsearch.elasticsearchIndices.PLACE.index;
// const indexType = data.elasticsearch.elasticsearchIndices.PLACE.type;
// const tableName = data.elasticsearch.elasticsearchIndices.PLACE.collectionName;
// indexer.indexMongodbData(indexName, indexType, tableName);
