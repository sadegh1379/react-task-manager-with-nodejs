import express from 'express';
import DB from '../db.js';

const router = express.Router();

router.patch('/tasks/:id', (req, res, next) => {
     const { title, completed } = req.body;
     const { id } = req.params;
     if(id) {
          const task = DB.getTaskById(id);
          if(task) {
               DB.editTask(title ? title : task.title, completed === true ? true : false, task.id)
               res.send(task);
          } else {
               res.status(404).send("task not found");
          }
     } else {
          res.status(400).send("invalid request (id is required)");
     }
})

export default router;