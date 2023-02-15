import express from 'express';
import Task from '../task.js';

const router = express.Router();

router.post('/tasks', (req, res, next) => {
     const { title } = req.body;
     try {
          const task = new Task(title, false);
          task.save();
     } catch (error) {
          res.json({ error: error })
     }
})

export default router;