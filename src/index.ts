
import express from "express";

import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import MONGO from "../config/config";
import { userRouter, tripRouter, tokenRouter, googleRouter } from "@router";

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


app.listen(port, async () => {

  console.log("start server");
});

mongoose
  .connect(MONGO.url, MONGO.options)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

