import express from 'express';
import Task from '../task.js';

const router = express.Router();

router.patch('/tasks', (req, res, next) => {
     const { id } = req.body;
     if(id) {
          const task = Task.getTaskById(id);
          if(task) {
               task.completed = !task.completed;
               task.save();
               res.send(task);
          } else {
               res.status(404).send("task not found");
          }
     } else {
          res.status(400).send("invalid request (id is required)");
     }
})

export default router;