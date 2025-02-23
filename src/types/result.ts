export interface Log {
  input: string;
  result: string;
}

export interface GameResult {
  id?: number;
  startTime?: Date;
  endTime?: Date;
  tryCount: number;
  logs?: Log[];
}
