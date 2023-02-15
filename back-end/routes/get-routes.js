import express from "express";
import DB from "../db.js";
import Task from "../task.js";

const router = express.Router();

router.get("/tasks", (req, res) => {
  const tasks = DB.getAllTasks();
  res.json(tasks);
});

export default router;
