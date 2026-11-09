import { Task } from "./task.ts";

export class Tasks {
  _list: Record<string, Task> = {};

  get listArr() {
    const list: Task[] = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  loadTasksFromArray(tasks: Task[]) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  completeTask(ids: string[]) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }

  deleteTask(id: string) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  createTask(description = "") {
    const task = new Task(description);
    this._list[task.id] = task;
  }

  listAllTasks() {
    console.log();
    this.listArr.forEach((task, index) => {
      const idx = `${index + 1}`.green;
      const { description, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;
      console.log(`${idx}. ${description} :: ${status}`);
    });
  }

  listPendingCompletedTasks(completed = true) {
    console.log();
    let counter = 0;
    this.listArr.forEach((task) => {
      const { description, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending".red;

      if (completed) {
        // Show completed tasks
        if (completedAt) {
          const formattedDate = new Intl.DateTimeFormat("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "America/Bogota",
          }).format(new Date(completedAt));
          counter += 1;
          console.log(
            `${(counter + ".").green} ${description} :: ${formattedDate.green}`,
          );
        }
      } else {
        // Show pending tasks
        if (!completedAt) {
          counter += 1;
          console.log(`${(counter + ".").green} ${description} :: ${status}`);
        }
      }
    });
  }
}
