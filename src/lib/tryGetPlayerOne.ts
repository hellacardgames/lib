type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function tryGetPlayerOne<TGame extends Game>(
  game: TGame,
): Player<TGame> | undefined {
  return game.players[0];
}
