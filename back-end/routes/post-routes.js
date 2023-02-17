import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

router.post('/tasks', (req, res, next) => {
     const { title } = req.body;
     try {
          const task = new Task(title, false);
          task.save();
          res.send("task created successfully");
     } catch (error) {
          res.status(400).json(error.message);
     }
})

export default router;