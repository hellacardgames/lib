import { tryGetPlayerTwo } from "./tryGetPlayerTwo.js";

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function getPlayerTwo<TGame extends Game>(game: TGame): Player<TGame> {
  const playerTwo = tryGetPlayerTwo(game);

  if (!playerTwo) {
    throw new Error("Player two not found.");
  }

  return playerTwo;
}
