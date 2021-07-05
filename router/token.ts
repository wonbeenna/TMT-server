import * as express from "express";

import { refreshToken } from "@tokenController/refreshToken";

const router = express.Router();

router.post("/refreshToken", refreshToken);

export = router;
