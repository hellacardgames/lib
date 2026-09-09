type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function requirePlayerTwo<TGame extends Game>(
  game: TGame,
): Player<TGame> {
  const playerTwo = game.players[1];

  if (!playerTwo) {
    throw new Error("Player two not found.");
  }

  return playerTwo;
}
