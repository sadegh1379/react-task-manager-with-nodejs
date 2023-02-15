import chalk from "chalk";
import DB from "./db.js";
import { parse, stringify } from "csv/sync";
import axios from "axios";
import inquirer from "inquirer";
import Task from "./task.js";
import fs from "fs";

const success = chalk.greenBright.bold;
const error = chalk.redBright.bold;
const warn = chalk.yellowBright.bold;

export default class Action {
  static list() {
    const tasks = DB.getAllTasks();
    if (tasks.length) {
      console.table(tasks);
    } else {
      console.log("there is no tasks");
    }
  }

  static async add() {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter task title?",
        validate: (value) => {
          if (value.length < 3) {
            console.log(warn("title must be more than 3 characters"));
            return false;
          }
          return true;
        },
      },
      {
        type: "confirm",
        name: "completed",
        message: "Task is completed?",
        default: false,
      },
    ]);
    try {
      const task = new Task(answer.title, answer.completed);
      task.save();
      console.log(success("task saved successfully"));
    } catch (error) {
      console.log(error(error.message));
    }
  }

  static async delete() {
    const tasks = DB.getAllTasks();
    const choices = tasks.map((t) => t.title);
    const answer = await inquirer.prompt({
      type: "list",
      name: "title",
      message: "Select a task to delete",
      choices,
    });
    const task = DB.getTaskByTitle(answer.title);
    try {
      DB.deleteTask(task.id);
      console.log(success("Task deleted"));
    } catch (error) {
      console.log(error(error.message));
    }
  }

  static async deleteAll() {
    const answer = await inquirer.prompt({
      type: "confirm",
      name: "delete",
      message: "Are you sure you want to delete all tasks",
      default: true,
    });
    if (answer.delete) {
      try {
        DB.resetDB();
        console.log(success("Delete all tasks"));
      } catch (error) {
        console.log(error(error.message));
      }
    }
  }

  static async edit() {
    const tasks = DB.getAllTasks();
    const choices = tasks.map((t) => t.title);
    const answer = await inquirer.prompt({
      type: "list",
      name: "result",
      message: "Select a task to edit",
      choices,
    });
    const task = DB.getTaskByTitle(answer.result);
    if (task) {
      const item = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter new task title?",
          validate: (value) => {
            if (value.length < 3) {
              console.log(warn("title must be more than 3 characters"));
              return false;
            }
            return true;
          },
        },
        {
          type: "confirm",
          name: "completed",
          message: "Task is completed?",
          default: false,
        },
      ]);
      try {
        DB.editTask(item.title, item.completed, task.id);
        console.log(success("Task edited successfully"));
      } catch (e) {
        console.log(error(e.message));
      }
    }
  }

  static async export() {
     const answer = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'enter file name',
          default: 'import'
     })
    const tasks = DB.getAllTasks();
    try {
      const data = stringify(tasks, { header: true });
      fs.writeFileSync(`${answer.name}.csv`, data);
      console.log(success("tasks exported successfully"));
    } catch (e) {
      console.log(error(e.message));
    }
  }

  static async import() {
     const answer = await inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'enter file name',
          validate: (value) => {
               if(!value.endsWith('.csv')){
                    console.log(error(' Also import csv file'));
                    return false;
               }
               return true;
          }
     })
     try {
       const file = fs.readFileSync(answer.name);
       const data = parse(file, { columns: true });
       DB.insertBulkData(data);
       console.log(success("tasks imported successfully"));
     } catch (e) {
       console.log(error(e.message));
     }
   }
}
