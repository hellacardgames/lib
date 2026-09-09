type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function requirePlayerOne<TGame extends Game>(
  game: TGame,
): Player<TGame> {
  const playerOne = game.players[0];

  if (!playerOne) {
    throw new Error("Player one not found.");
  }

  return playerOne;
}
