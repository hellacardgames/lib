import { tryGetPlayerOne } from "./tryGetPlayerOne.js";

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function getPlayerOne<TGame extends Game>(game: TGame): Player<TGame> {
  const playerOne = tryGetPlayerOne(game);

  if (!playerOne) {
    throw new Error("Player one not found.");
  }

  return playerOne;
}
