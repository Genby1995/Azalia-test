import { Router } from "express";
import dataController from "./controllers/dataController";

const router = new Router()

router.post("/messages", dataController.message);
router.post("/numbers", dataController.number);
router.get("/data", dataController.data);

export default router