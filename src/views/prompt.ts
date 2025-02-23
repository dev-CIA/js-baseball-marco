import { rl } from "../rl.js";
import * as message from "../constants/messages.js";

const getUserInput = (prompt: string): Promise<string> =>
  new Promise((resolve) => {
    rl.question(prompt, (answer: string) => {
      resolve(answer.trim());
    });
  });

const showEndGame = () => {
  console.log(message.END);
  rl.close();
  process.exit(0);
};

const printResult = (balls: number, strikes: number) => {
  let result = "";

  if (strikes === 3) {
    result = `3${message.STRIKE}`;
    console.log(result);
    console.log(message.WIN_GAME);

    return { status: false, result, endTime: new Date() };
  }

  if (!balls && !strikes) result = message.NOTHING;

  if (balls || strikes)
    result = [
      balls ? `${balls}${message.BALL}` : "",
      strikes ? `${strikes}${message.STRIKE}` : "",
    ]
      .join(" ")
      .trim();

  console.log(result);
  return { status: true, result };
};

export { getUserInput, showEndGame, printResult };
