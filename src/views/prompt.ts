const cmd = require("@/rl");
const message = require("@/constants/messages");
// const { playGame } = require("@/games");

const getUserInput = (prompt: string) =>
  new Promise((resolve) => {
    cmd.question(prompt, (answer: string) => {
      resolve(answer.trim());
    });
  });

const showEndGame = () => {
  console.log(message.END);
  cmd.close();
  process.exit(0);
};

module.exports = {
  getUserInput,
  showEndGame,
  // askToStart,
};
