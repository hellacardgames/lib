import { requirePlayer } from "../lib/requirePlayer.js";
import { updatePlayer } from "../lib/updatePlayer.js";

type DoGetEventsAndClearAcknowledgedResult<TGame extends Game> = {
  readonly events: readonly Event<TGame>[];
  readonly game: TGame;
};

type Event<TGame extends Game> = TGame["players"][number]["events"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly events: readonly {
      readonly id: string;
    }[];
  }[];
};

export function doGetEventsAndClearAcknowledged<TGame extends Game>(
  game: TGame,
  playerId: string,
  lastReadId: string | null,
): DoGetEventsAndClearAcknowledgedResult<TGame> {
  const { player } = requirePlayer(game, playerId);

  const lastReadEventIndex = player.events.findIndex(
    (e) => e.id === lastReadId,
  );

  // -1 => slice(0) => return all events
  const events = player.events.slice(lastReadEventIndex + 1);

  game = updatePlayer(game, player.id, (p) => ({ ...p, events }));

  return {
    events,
    game,
  };
}
