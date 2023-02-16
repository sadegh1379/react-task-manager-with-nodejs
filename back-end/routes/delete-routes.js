import express from 'express';
import DB from '../db.js';
import Task from '../task.js';

const router = express.Router();

router.delete('/tasks/:id', (req, res, next) => {
     const { id } = req.params;
     if(id) {
          const task = Task.getTaskById(id);
          if(task) {
               DB.deleteTask(id)
               res.send(task);
          } else {
               res.status(404).send("task not found");
          }
     } else {
          res.status(400).send("invalid request (id is required)");
     }
})

export default router;