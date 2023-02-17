import express from "express";
import DB from "../models/db.js";
import Task from "../models/task.js";

const router = express.Router();

router.get("/tasks", (req, res) => {
  const tasks = DB.getAllTasks();
  res.json(tasks);
});

export default router;
