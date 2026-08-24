type Game<TEvent extends GameEvent> = {
  readonly players: readonly {
    readonly events: readonly TEvent[];
  }[];
};

type GameEvent = {
  readonly id: string;
};

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEvent<TEvent extends GameEvent, TGame extends Game<TEvent>>(
  game: TGame,
  data: OmitId<TEvent>,
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
