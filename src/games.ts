import * as message from "./constants/messages.js";
import {
  getUserInput,
  showEndGame,
  printResult,
  printLogs,
} from "./views/prompt.js";
import { generateGameNumber } from "./util.js";
import { logGameProgress } from "./game-logger.js";
import { type GameResult } from "./types/result.js";

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
  let tryCount = 0;
  const gameNumber = generateGameNumber();
  const game: GameResult = {
    logs: [],
    tryCount: 0,
  };
  logGameProgress(game, tryCount);

  while (gameStatus) {
    const userInput = await getUserInput(message.INPUT_NUMBER);

    if (userInput === "9") showEndGame();
    if (!isValid(userInput)) {
      console.log(message.INPUT_ERROR_3_OTHERS_NUM);
      continue;
    }
    const { balls, strikes } = getResult(userInput, gameNumber);

    const gameResult = printResult(balls, strikes);
    logGameProgress(game, ++tryCount, userInput, gameResult);

    gameStatus = gameResult.status;
  }
};

const askToStart = async () => {
  while (true) {
    const answer = await getUserInput(message.START_OR_END);

    if (answer === "1") await playGame();
    if (answer === "2") await printLogs();
    if (answer === "9") showEndGame();
    if (answer !== "1" && answer !== "2" && answer !== "9")
      console.log(message.INPUT_ERROR);
  }
};

export { askToStart };
