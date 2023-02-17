import express from 'express';
import TaskControllers from '../controllers/taskControllers.js';

const router = express.Router();

router.patch('/tasks/:id', TaskControllers.patchTask)

export default router;