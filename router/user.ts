import express from "express";

import { likePost } from "@userController/like";
import { likeGet } from "@userController/like";
import { likeDelete } from "@userController/like";
import { myPage } from "@userController/myPage";
import { photoLike } from "@userController/photoLike";
import { signIn } from "@userController/signIn";
import { signUp } from "@userController/signUp";
import { userInfoPost } from "@userController/userInfo";
import { userInfoGet } from "@userController/userInfo";
import { nonUser } from "@userController/nonUser";

const router = express.Router();

router.post("/like", likePost);
router.get("/like", likeGet);
router.delete("/like", likeDelete);
router.get("/photoLike", photoLike);
router.get("/myPage", myPage);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/userInfo", userInfoPost);
router.get("/userInfo", userInfoGet);
router.get("/nonUser", nonUser);

export = router;
