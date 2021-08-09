import * as express from "express";

import { googleLogin } from "@authController/google";
import { kakaoLogin } from "@authController/kakao";

const router = express.Router();

router.post("/google", googleLogin);
router.post("/kakao", kakaoLogin);

export = router;
