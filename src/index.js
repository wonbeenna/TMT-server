"use strict";
exports.__esModule = true;
// import * as express  from 'express';
var express_1 = require("express");
var cors_1 = require("cors");
// import userRouter from '@userRouter';
// import userRouter = require('@userRouter')
var _router_1 = require("@router");
var port = 4000;
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(
  cors_1["default"]({
    origin: ["http://localhost:3000"],
    //origin : true
    methods: "GET, POST, OPTIONS",
    credentials: true,
  })
);
app.use("/user", _router_1.userRouter);
app.use("/trip", _router_1.tripRouter);
app.get("/", function (req, res) {
  res.status(201).send("서버는 서버서버해서 서버야");
});
app.listen(port, function () {
  console.log("start server");
});
