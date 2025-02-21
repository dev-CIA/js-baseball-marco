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

const getResult = (input: string, gameNumber: string) => {
  let [balls, strikes] = [0, 0];
  const inputNumbers = input.split("");

  inputNumbers.forEach((number, idx) => {
    if (number === gameNumber[idx]) strikes++;
    if (number !== gameNumber[idx] && gameNumber.includes(number)) balls++;
  });

  return { balls, strikes };
};

const printResult = (balls: number, strikes: number) => {
  if (strikes === 3) {
    console.log(
      "3스트라이크\n\n3개의 숫자를 모두 맞히셨습니다.\n\n-------게임 종료-------\n\n"
    );

    return false;
  }

  if (!balls && !strikes) console.log("낫싱");
  if (balls && strikes) console.log(`${balls}볼 ${strikes}스트라이크`);
  if (balls && !strikes) console.log(`${balls}볼`);
  if (!balls && strikes) console.log(`${strikes}스트라이크`);
  return true;
};

const playGame = async () => {
  let gameStatus = true;
  const gameNumber = generateGameNumber();

  while (gameStatus) {
    const userInput = await getUserInput(message.INPUT_NUMBER);

    if (userInput === "9") showEndGame();
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
  playGame,
  askToStart,
};
