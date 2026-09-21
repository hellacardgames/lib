import { getOtherPlayer } from "../players/getOtherPlayer.js";
import { updatePlayer } from "../players/updatePlayer.js";

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

export function emitEventToOtherPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
  data: OmitId<TGame["players"][number]["events"][number]>,
): TGame {
  const { otherPlayer } = getOtherPlayer(game, playerId);

  return updatePlayer(game, otherPlayer.id, (p) => ({
    ...p,
    events: [...p.events, { ...data, id: crypto.randomUUID() }],
  }));
}
