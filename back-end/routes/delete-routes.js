import express from 'express';
import TaskControllers from '../controllers/taskControllers.js'

const router = express.Router();

router.delete('/tasks/:id', TaskControllers.deleteTask)

export default router;