import { doGetEventsAndClearAcknowledged } from "../helpers/doGetEventsAndClearAcknowledged.js";
import { tryGetPlayer } from "../lib/tryGetPlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly events: readonly {
      readonly id: string;
    }[];
  }[];
};

export function getEventsAndClearAcknowledged<TGame extends Game>(
  game: TGame,
  playerId: string,
  lastReadId: string | null,
) {
  const { player } = tryGetPlayer(game, playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }

  const result = doGetEventsAndClearAcknowledged(game, player.id, lastReadId);

  return {
    success: true,
    events: result.events,
    game: result.game,
  } as const;
}
