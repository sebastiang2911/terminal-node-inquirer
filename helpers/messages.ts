import readline from "node:readline";

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("===========================".green);
    console.log("   Select an option".green);
    console.log("=========================== \n".green);

    console.log(`${"1.".green} Create task`);
    console.log(`${"2.".green} List tasks`);
    console.log(`${"3.".green} List completed tasks`);
    console.log(`${"4.".green} List pending tasks`);
    console.log(`${"5.".green} Complete task(s)`);
    console.log(`${"6.".green} Delete task`);
    console.log(`${"0.".green} Exit \n`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("select an option: ", (opt) => {
      rl.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\nPress ${"ENTER".green} to continue...`, (opt) => {
      rl.close();
      resolve(opt);
    });
  });
};

export { pause, showMenu };
