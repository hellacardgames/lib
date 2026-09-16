import { requirePlayer } from "./requirePlayer.js";

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

export function emitEventToOtherPlayers<TGame extends Game>(
  game: TGame,
  playerId: string,
  data: OmitId<TGame["players"][number]["events"][number]>,
): TGame {
  const { player } = requirePlayer(game, playerId);
  const event = { ...data, id: crypto.randomUUID() };

  return {
    ...game,
    players: game.players.map((p) => {
      if (p.id !== player.id) {
        return {
          ...p,
          events: [...p.events, event],
        };
      }
      return p;
    }),
  };
}
