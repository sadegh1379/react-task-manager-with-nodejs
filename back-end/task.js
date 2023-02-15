import util from "util";

import chalk from "chalk";
import { uuid } from "uuidv4";

import DB from "./db.js";

export default class Task {
  #id = uuid();
  #title;
  #completed;
  constructor(title, completed = false) {
    this.#title = title;
    this.#completed = completed;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get completed() {
    return this.#completed;
  }

  set title(value) {
    if (typeof value !== "string" || value.length < 3) {
      throw new Error("Invalid title or title must be more than 3 characters");
    }
    this.#title = value;
  }

  set completed(value) {
    this.#completed = Boolean(value);
  }

  [util.inspect.custom]() {
    return `Task {
          id: ${chalk.yellowBright.bold(this.#id)}
          title: ${chalk.yellowBright.bold(this.#title)}
          complete: ${
            this.#completed
              ? chalk.greenBright.bold(this.#completed)
              : chalk.redBright.bold(this.#completed)
          }
     }`;
  }

  save() {
    try {
     const taskExsis = DB.getTaskById(this.#id);
     if(taskExsis) {
          try {
               DB.editTask(this.#title, this.#completed, this.#id)
          } catch (error) {
               throw new Error(error.message);
          }
     } else {
          const id = DB.saveTask(this.#title, this.#completed, this.#id);
          this.#id = id;
     }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static getTaskById(taskId) {
     const task = DB.getTaskById(taskId);
     if(task) {
          const item = new Task(task.title, task.completed);
          item.#id = taskId;
          return item;
     } else {
          return false;
     }
  }

  static getTaskByTitle(taskTitle) {
     const task = DB.getTaskByTitle(taskTitle);
     if(task) {
          const item = new Task(task.title, task.completed);
          item.#id = task.id;
          return item;
     } else {
          return false;
     }
   }

   static getAllTasks(){
     const tasks = DB.getAllTasks();
     const items = [];
     for (let task of tasks) {
          const item = new Task(task.title, task.completed);
          item.#id = task.id;
          items.push(item);
     }
     return items;
   }
}
