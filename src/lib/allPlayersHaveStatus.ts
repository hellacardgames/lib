type Game = {
  readonly players: readonly {
    readonly status: string;
  }[];
};

export function allPlayersHaveStatus<TGame extends Game>(
  game: TGame,
  status: TGame["players"][number]["status"],
): boolean {
  return game.players
    .map((p) => p.status === status)
    .reduce((previous, current) => previous && current, true);
}
