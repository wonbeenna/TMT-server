import * as express from "express";

import { googleLogin } from "@authController/google";

const router = express.Router();

router.post("/google", googleLogin);

export = router;
