type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function updatePlayers<TGame extends Game>(
  game: TGame,
  update: (player: TGame["players"][number]) => TGame["players"][number],
): TGame {
  return { ...game, players: game.players.map(update) };
}
