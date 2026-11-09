import inquire from "inquirer";
import { Task } from "../models/task.ts";

const questions = [
  {
    type: "select",
    name: "option",
    message: "What do you want to do?",
    choices: [
      { value: "1", name: `${"1.".green} Create task` },
      { value: "2", name: `${"2.".green} List tasks` },
      { value: "3", name: `${"3.".green} List completed tasks` },
      { value: "4", name: `${"4.".green} List pending tasks` },
      { value: "5", name: `${"5.".green} Complete task(s)` },
      { value: "6", name: `${"6.".green} Delete task` },
      { value: "0", name: `${"0.".green} Exit` },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();

  console.log("===========================".green);
  console.log("   Select an option".green);
  console.log("=========================== \n".green);

  const { option } = await inquire.prompt(questions);
  return option;
};

const questionPause = [
  {
    type: "input",
    name: "enter",
    message: `Press ${"ENTER".green} to continue`,
  },
];

export const pause = async () => {
  console.log("\n");
  const { enter } = await inquire.prompt(questionPause);
  return enter;
};

export const readInput = async (message: string) => {
  const questionInput = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value: string) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquire.prompt(questionInput);
  return desc;
};

export const listTasksToDelete = async (tasks: Task[]) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0".green + " Cancel",
  });

  const questions = [
    {
      type: "select",
      name: "id",
      message: "Delete",
      choices,
    },
  ];

  const { id } = await inquire.prompt(questions);
  return id;
};

export const confirm = async (message: string) => {
  const { ok } = await inquire.prompt({
    type: "confirm",
    name: "ok",
    message,
  });
  return ok;
};

export const showChecklist = async (tasks: Task[]) => {
  if (tasks.length === 0) {
    console.log("No tasks available.".yellow);
    return [];
  }

  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];

  const { ids } = await inquire.prompt(question);
  return ids;
};
