const message = require("@/constants/messages");
const { getUserInput, showEndGame } = require("@/views/prompt");

const generateGameNumber = (): string => {
  const numbers: number[] = [];

  while (numbers.length < 3) {
    const number = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(number)) numbers.push(number);
  }

  console.log(message.GENERATE_NUMBER);
  return numbers.join("");
};

const playGame = async () => {
  const gameNumber = generateGameNumber();

  while (true) {
    const userInput = await getUserInput(message.INPUT_NUMBER);

    if (userInput === "9") showEndGame();
  }
};

const askToStart = async () => {
  while (true) {
    const answer = await getUserInput(message.START_OR_END);

    if (answer === "1") await playGame();
    if (answer === "9") showEndGame();
    if (answer !== "1" && answer !== "9") console.log(message.INPUT_ERROR);
  }
};

module.exports = {
  playGame,
  askToStart,
};
