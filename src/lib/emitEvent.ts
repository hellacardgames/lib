type Game = {
  readonly players: readonly {
    readonly events: readonly {
      readonly id: string;
      readonly type: string;
    }[];
  }[];
};

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEvent<TGame extends Game>(
  game: TGame,
  data: OmitId<TGame["players"][number]["events"][number]>,
): TGame {
  const event = { ...data, id: crypto.randomUUID() };

  return {
    ...game,
    players: game.players.map((p) => ({
      ...p,
      events: [...p.events, event],
    })),
  };
}
