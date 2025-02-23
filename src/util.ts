import * as message from "./constants/messages.js";

export const generateGameNumber = (): string => {
  const numbers: number[] = [];

  while (numbers.length < 3) {
    const number = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(number)) numbers.push(number);
  }

  console.log(message.GENERATE_NUMBER);
  return numbers.join("");
};
