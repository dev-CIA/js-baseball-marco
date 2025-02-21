const message = require("@/constants/messages");
const { getUserInput, showEndGame, printResult } = require("@/views/prompt");

const generateGameNumber = (): string => {
  const numbers: number[] = [];

  while (numbers.length < 3) {
    const number = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(number)) numbers.push(number);
  }

  console.log(message.GENERATE_NUMBER);
  return numbers.join("");
};

const getResult = (input: string, gameNumber: string) => {
  let [balls, strikes] = [0, 0];
  const inputNumbers = input.split("");

  inputNumbers.forEach((number, idx) => {
    if (number === gameNumber[idx]) strikes++;
    if (number !== gameNumber[idx] && gameNumber.includes(number)) balls++;
  });

  return { balls, strikes };
};

const isValid = (userInput: string) => {
  const numbers = new Set(userInput.split(""));
  if (numbers.size !== 3) return false;
  return /^[1-9]{3}$/.test(userInput.trim());
};

const playGame = async () => {
  let gameStatus = true;
  const gameNumber = generateGameNumber();

  while (gameStatus) {
    const userInput = await getUserInput(message.INPUT_NUMBER);

    if (userInput === "9") showEndGame();
    if (!isValid(userInput)) {
      console.log(message.INPUT_ERROR_3_OTHERS_NUM);
      continue;
    }
    const { balls, strikes } = getResult(userInput, gameNumber);

    gameStatus = printResult(balls, strikes);
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
  askToStart,
};
