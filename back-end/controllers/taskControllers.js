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
}
