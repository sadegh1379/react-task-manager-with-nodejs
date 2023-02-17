import DB from "../models/db.js";
import Task from "../models/task.js";

export default class TaskControllers {
  static deleteTask(req, res, next) {
    const { id } = req.params;
    if (id) {
      const task = Task.getTaskById(id);
      if (task) {
        DB.deleteTask(id);
        res.send(task);
      } else {
        res.status(404).send("task not found");
      }
    } else {
      res.status(400).send("invalid request (id is required)");
    }
  }

  static getTasks(req, res, next) {
    const tasks = DB.getAllTasks();
    res.json(tasks);
  }

  static patchTask(req, res, next) {
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
  }

  static addTask(req, res, next) {
    const { title } = req.body;
    try {
         const task = new Task(title, false);
         task.save();
         res.send("task created successfully");
    } catch (error) {
         res.status(400).json(error.message);
    }
  }
}
