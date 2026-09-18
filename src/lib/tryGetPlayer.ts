type TryGetPlayerResult<TGame extends Game> = {
  readonly player: Player<TGame> | undefined;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function tryGetPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): TryGetPlayerResult<TGame> {
  const index = game.players.findIndex((p) => p.id === playerId);

  return {
    player: game.players[index],
    index,
  };
}
