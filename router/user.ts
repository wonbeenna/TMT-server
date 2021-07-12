import express from "express";

import { likePost } from "@userController/like";
import { likeGet } from "@userController/like";
import { likeDelete } from "@userController/like";
import { myPage } from "@userController/myPage";
import { signIn } from "@userController/signIn";
import { signOut } from "@userController/signOut";
import { signUp } from "@userController/signUp";
import { userInfoPost } from "@userController/userInfo";
import { userInfoGet } from "@userController/userInfo";

const router = express.Router();

router.post("/like", likePost);
router.get("/like", likeGet);
router.delete("/like", likeDelete);
router.get("/myPage", myPage);
router.post("/signIn", signIn);
router.post("/signOut", signOut);
router.post("/signUp", signUp);
router.post("/userInfo", userInfoPost);
router.get("/userInfo", userInfoGet);

export = router;

// import likePost = require('../controller/user/like')
// import likeGet = require('../controller/user/like')
// import myPage = require('../controller/user/myPage')
// import signIn = require('../controller/user/signIn')
// import signOut = require('../controller/user/signOut')
// import signUp = require('../controller/user/signUp')
// import userInfoPost = require('../controller/user/userInfo')
// import userInfoGet = require('../controller/user/userInfo')

// const userRouter = express.Router();

// userRouter.post("/like", likePost);
// userRouter.get("/like", likeGet);
// userRouter.get("/myPage", myPage);
// userRouter.post("/signIn", signIn);
// userRouter.post("/signOut", signOut);
// userRouter.post("/signUp", signUp);
// userRouter.post("/userInfo", userInfoPost);
// userRouter.get("/userInfo", userInfoGet);

// export = userRouter;
