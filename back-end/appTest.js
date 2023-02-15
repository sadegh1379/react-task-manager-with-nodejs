import chalk from "chalk";
import "dotenv/config";
import DB from "./db.js";
import Action from "./action.js";

console.clear();
const error = chalk.redBright.bold;
const warn = chalk.yellowBright.bold;

const command = process.argv[2];
const commands = [
  "list",
  "add",
  "delete",
  "delete-all",
  "edit",
  "export",
  "import",
  "download",
];
if (command) {
  if (command === "list") {
    Action.list();
  } else if (command === "add") {
     Action.add();
  } else if (command === "delete"){
     Action.delete();
  } else if (command === "delete-all"){
     Action.deleteAll();
  } else if (command === "edit"){
     Action.edit();
  } else if (command === "export"){
     Action.export();
  } else if (command === "import"){
     Action.import();
  } else {
    const message = `${error("Enter invalid command")}
          Avilabel command:
          ${warn(commands.join("\n"))}`;
    console.log(message);
  }
} else {
  const message = `${error("You must enter a command")}
Avilabel command:
${warn(commands.join("\n"))}`;
  console.log(message);
}

let data = [
  {
    title: "sadegh",
    completed: true,
    id: "13692734-2b26-41c6-8c5c-91c728a594c3",
  },
  {
    title: "ali",
    completed: false,
    id: "cb587909-0b57-4c9b-a2ed-10bab0c80dd2",
  },
  {
    title: "hamid",
    completed: false,
    id: "f71e3ac8-386c-4559-aac7-29b7a3f5f44c",
  },
];
// DB.createDB();
DB.insertBulkData(data);
// console.log(DB.getAllTasks());
