import fs from "fs";
import chalk from "chalk";
import { uuid as v4 } from 'uuidv4';

const fileName = process.env.DB_NAME;
const warn = chalk.yellowBright.bold;
const success = chalk.greenBright.bold;

export default class DB {
  static createDB() {
    if (fs.existsSync(fileName)) {
      console.log(warn("DB file already exists"));
      return false;
    }
    try {
      fs.writeFileSync(fileName, "[]", "utf-8");
      console.log(success("DB file created successfully"));
      return true;
    } catch (error) {
      throw new Error("can not write in " + fileName);
    }
  }

  static resetDB() {
    try {
      fs.writeFileSync(fileName, "[]", "utf-8");
      console.log("BD reset successfully");
      return true;
    } catch (error) {
      throw new Error("can not reset " + fileName);
    }
  }

  static DBExists() {
    if (fs.existsSync(fileName)) {
      return true;
    } else {
      return false;
    }
  }

  static getTaskById(taskId) {
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName, "utf-8");
    } else {
      DB.createDB();
      return false;
    }
    try {
      data = JSON.parse(data);
      let task = data.find((t) => t.id === taskId);
      return task ? task : false;
    } catch (error) {
      throw new Error("syntax error \nplease check DB file");
    }
  }

  static getTaskByTitle(taskTitle) {
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName, "utf-8");
    } else {
      DB.createDB();
      return false;
    }
    try {
      data = JSON.parse(data);
      let task = data.find((t) => t.title === taskTitle);
      return task ? task : false;
    } catch (error) {
      throw new Error("syntax error \nplease check DB file");
    }
  }

  static getAllTasks(){
    if(!DB.DBExists()) {
      DB.createDB();
      return [];
    }
    try {
      let data = fs.readFileSync(fileName, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error("can not read data from " + fileName);
    }
  }

  static saveTask(title, completed = false, id) {
    if (typeof title !== "string" || title.length < 3) {
      throw new Error("title must be a string and greater than 3 letters");
    } 
    const task = DB.getTaskByTitle(title);
    if(task) {
      throw new Error("a task exists with this title");
    }
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName);
      data = JSON.parse(data);
      let newTask = {
        title,
        completed,
        id: id ? id : v4(),
      }
      data.push(newTask);
      data = JSON.stringify(data, null, "    ");
      fs.writeFileSync(fileName, data, 'utf-8');
      return newTask.id;
    } else {
      try {
        DB.createDB();
        return false;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  static editTask(title, completed, id) {
    if (typeof title !== "string" || title.length < 3) {
      throw new Error("title must be a string and greater than 3 letters");
    } 
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName);
      data = JSON.parse(data);
      data = data.map(t => {
        if(t.id === id) {
          return{
            id: t.id,
            title,
            completed
          }
        }
        return t;
      })
      data = JSON.stringify(data, null, "   ");
      fs.writeFileSync(fileName, data, 'utf-8');
      return id;
    } else {
      try {
        DB.createDB();
        return false;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  static insertBulkData(data) {

    if(typeof data === 'string'){
      try {
        data = JSON.parse(data);
      } catch (err) {
        throw new Error('Invalid data');
      }
    }

    if(data instanceof Array) {
      data = JSON.stringify(data, null, "    ");
    } else {
      throw new Error('Invalid data');
    }
    try {
      fs.writeFileSync(fileName, data);
    } catch (error) {
      throw new Error('can not write in ' + fileName);
    }
  }

  static deleteTask(taskId) {
    let data;
    try {
      data = fs.readFileSync(fileName, 'utf-8');
      data = JSON.parse(data);
      data = data.filter(t => t.id !== taskId);
      data = JSON.stringify(data, null, "   ");
      try {
        fs.writeFileSync(fileName, data);
        return true;
      } catch (error) {
        throw new Error('can not write file ' + fileName);
      }
    } catch (error) {
      throw new Error('can not delete task ' + taskId);
    }
  }
}
