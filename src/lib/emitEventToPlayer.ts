import { updatePlayer } from "./updatePlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly events: readonly {
      readonly id: string;
      readonly type: string;
    }[];
  }[];
};

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEventToPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
  data: OmitId<TGame["players"][number]["events"][number]>,
): TGame {
  return updatePlayer(game, playerId, (p) => ({
    ...p,
    events: [...p.events, { ...data, id: crypto.randomUUID() }],
  }));
}
