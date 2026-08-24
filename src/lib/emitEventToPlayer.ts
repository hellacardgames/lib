import { updatePlayer } from "./updatePlayer.js";

type Game<TEvent extends GameEvent> = {
  readonly players: readonly {
    readonly id: string;
    readonly events: readonly TEvent[];
  }[];
};

type GameEvent = {
  readonly id: string;
};

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEventToPlayer<
  TEvent extends GameEvent,
  TGame extends Game<TEvent>,
>(game: TGame, playerId: string, data: OmitId<TEvent>): TGame {
  return updatePlayer(game, playerId, (p) => ({
    ...p,
    events: [...p.events, { ...data, id: crypto.randomUUID() }],
  }));
}
