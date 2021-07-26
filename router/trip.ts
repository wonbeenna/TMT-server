import * as express from "express";
import { insertSpot } from "@tripController/insertSpot";
import { listPost } from "@tripController/list";
import { listGet } from "@tripController/list";
import { recommend } from "@tripController/recommend";
import { searchPost, searchGet } from "@tripController/search";
import { dbPost } from "@tripController/db";

const router = express.Router();

router.post("/insertSpot", insertSpot);
router.post("/list", listPost);
router.get("/list", listGet);
router.post("/recommend", recommend);
router.post("/search", searchPost);
router.get("/search", searchGet);
router.post("/db", dbPost);

export = router;
