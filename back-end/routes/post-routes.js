import express from "express";
import TaskControllers from "../controllers/taskControllers.js";

const router = express.Router();

router
  .post("/tasks", TaskControllers.addTask)
  .post("/tasks/send-email", TaskControllers.sendEmail);

export default router;
