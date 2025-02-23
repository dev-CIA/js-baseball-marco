import type { GameResult } from "./types/result.js";
import { gameResults } from "./data.js";

interface Result {
  status: boolean;
  result: string;
  endTime?: Date;
}

const logGameProgress = (
  tryCount: number,
  input?: string,
  gameResult?: Result
) => {
  const game: GameResult = {
    startTime: new Date(),
    logs: [],
    tryCount,
  };
  if (tryCount) {
    game.tryCount++;
    if (input && gameResult)
      game.logs?.push({ input: input, result: gameResult.result });
    if (gameResult?.endTime) {
      game["endTime"] = gameResult.endTime;
      storeGameResult(game);
    }
  }
};

const storeGameResult = (result: GameResult) => {
  gameResults.push({ id: gameResults.length + 1, ...result });
};

export { logGameProgress, storeGameResult };
