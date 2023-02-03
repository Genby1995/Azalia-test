import { Router } from "express";
import dataController from "./controllers/data_controller.js";

const router = new Router()

router.post("/messages", dataController.addMessage);
router.post("/numbers", dataController.addNumber);
router.get("/data", dataController.getData);
router.delete("/data", dataController.clearData);

export default router