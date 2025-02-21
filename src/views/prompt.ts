const cmd = require("@/rl");
const message = require("@/constants/messages");

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

const printResult = (balls: number, strikes: number) => {
  if (strikes === 3) {
    console.log(message.THREE_STRIKE);

    return false;
  }

  if (!balls && !strikes) console.log(message.NOTHING);

  if (balls || strikes) {
    const result = [
      balls ? `${balls}${message.BALL}` : "",
      strikes ? `${strikes}${message.STRIKE}` : "",
    ];

    console.log(result.join(" ").trim());
  }

  return true;
};

module.exports = {
  getUserInput,
  showEndGame,
  printResult,
};
