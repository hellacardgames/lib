import { doGetEventsAndClearAcknowledged } from "./doGetEventsAndClearAcknowledged.js";

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
  const player = game.players.find((p) => p.id === playerId);
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
