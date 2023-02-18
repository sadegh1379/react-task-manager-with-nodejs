import DB from "../models/db.js";
import Task from "../models/task.js";
import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akbarisadegh382@gmail.com',
    pass: 'zuwjrrypvuyippzi'
  }
});

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
    let page = 1, limit = 4, finished = undefined, search = "";
    if(req.query.page) page = req.query.page;
    if(req.query.limit) limit = req.query.limit;
    if(req.query.finished !== undefined) finished = req.query.finished === "true" ? true : false;
    if(req.query.search) search = req.query.search;

    let tasks = DB.getAllTasks();
    let totalTasks = tasks.length;
    if(finished !== undefined) {
      tasks = tasks.filter(t => t.completed === finished)
    }

    tasks = tasks.filter(t => t.title.includes(search));
    totalTasks = tasks.length;
    const start = (page - 1) * limit;
    tasks = tasks.slice(start, start + limit);
    res.json({
      tasks,
      totalPage: parseInt((totalTasks + 1) / limit),
      totalTasks,
      page,
      limit,
    });
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

  static sendEmail(req, res){
    var mailOptions = {
      from: 'akbarisadegh382@gmail.com',
      to: 'akbarisadegh480@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.send(error);
      } else {
        res.send(info.response)
      }
    });
  }
}
