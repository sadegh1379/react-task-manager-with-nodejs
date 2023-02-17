import express from "express";
import TaskControllers from "../controllers/taskControllers.js";

const router = express.Router();

router.get("/tasks", TaskControllers.getTasks);

export default router;
