const cmd = require("@/rl");
const message = require("./messages");

const getUserInput = (prompt: string) =>
  new Promise((resolve) => {
    cmd.question(prompt, (answer: string) => {
      resolve(answer.trim());
    });
  });

const askToStart = async () => {
  while (true) {
    const answer = await getUserInput(message.START_OR_END);

    if (answer === "1") console.log("play");
    if (answer === "9") {
      console.log(message.END);
      cmd.close();
      process.exit(0);
    }
    if (answer !== "1" && answer !== "9") console.log(message.INPUT_ERROR);
  }
};

module.exports = {
  askToStart,
};
