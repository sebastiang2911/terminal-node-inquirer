import colors from "colors";
import {
  inquirerMenu,
  pause,
  readInput,
  listTasksToDelete,
  confirm,
  showChecklist,
} from "./helpers/inquirer.ts";
import { saveFile, readFile } from "./helpers/saveFile.ts";
import { Tasks } from "./models/tasks.ts";

const main = async () => {
  console.log(colors.rainbow("TODO CLI!"));

  let opt, enter, taskDescription;

  const task = new Tasks();
  const tasksFromDB = readFile("tasks.json");

  if (tasksFromDB) {
    task.loadTasksFromArray(JSON.parse(tasksFromDB));
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        taskDescription = await readInput("Enter task description:");

        task.createTask(taskDescription);
        break;
      case "2":
        task.listAllTasks();
        break;
      case "3":
        task.listPendingCompletedTasks(true);
        break;
      case "4":
        task.listPendingCompletedTasks(false);
        break;
      case "5":
        const idsChecked = await showChecklist(task.listArr);
        task.completeTask(idsChecked);
        break;
      case "6":
        const taskId = await listTasksToDelete(task.listArr);
        if (taskId !== "0") {
          const ok = await confirm(
            "Are you sure you want to delete this task?",
          );
          if (ok) {
            task.deleteTask(taskId);
            console.log(`Task ${taskId} deleted`.green);
          }
        }
        break;
      default:
        console.log("Default");
        break;
    }

    saveFile(JSON.stringify(task?.listArr), "tasks.json");

    if (opt !== "0") {
      enter = await pause();
    }
  } while (opt !== "0");
};

main();
