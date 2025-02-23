import { rl } from "../rl.js";
import * as message from "../constants/messages.js";
import { gameResults } from "../data.js";
import { formatDateOptions } from "../constants/date.js";
import { GameResult } from "@/types/result.js";

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

  if (balls || strikes) {
    result = [
      balls ? `${balls}${message.BALL}` : "",
      strikes ? `${strikes}${message.STRIKE}` : "",
    ]
      .join(" ")
      .trim();
  }

  console.log(result);
  return { status: true, result };
};

const printLogs = async () => {
  if (!gameResults.length) {
    console.log(message.NO_LOGS);
    return;
  }

  const resultList = gameResults.map(({ id, startTime, endTime, tryCount }) => [
    `[${id}] / 시작시간: ${startTime?.toLocaleString(
      "ko-KR",
      formatDateOptions
    )} / 종료시간: ${endTime?.toLocaleString(
      "ko-KR",
      formatDateOptions
    )} / 횟수: ${tryCount}`,
  ]);
  console.log("게임 기록");
  console.log(resultList.join("\n"));

  const gameNumber = await getUserInput(
    "\n확인할 게임 번호를 입력하세요 (종료하려면 0을 입력):"
  );
  if (gameNumber === "0") return;
  if (+gameNumber > gameResults.length) {
    console.log(message.NO_LOGS);
    return;
  }

  const log: GameResult | undefined = gameResults.find(
    ({ id }) => id === +gameNumber
  );

  console.log(
    `\n${log?.id}번 게임 결과\n${log?.logs
      ?.map(({ input, result }) => `숫자를 입력해주세요: ${input}\n${result}`)
      .join(
        "\n"
      )}\n\n3개의 숫자를 모두 맞히셨습니다.\n-------기록 종료-------\n\n`
  );
};

export { getUserInput, showEndGame, printResult, printLogs };
