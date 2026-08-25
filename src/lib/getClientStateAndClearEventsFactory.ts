import { updatePlayer } from "./updatePlayer.js";

type Game = {
  players: readonly {
    id: string;
  }[];
};

export function getClientStateAndClearEventsFactory<
  TGame extends Game,
  TClientState extends object,
>(transform: (game: TGame, player: TGame["players"][number]) => TClientState) {
  return (game: TGame, playerId: string) => {
    const player = game.players.find((p) => p.id === playerId);
    if (!player) {
      return { success: false, error: "playerNotFound" } as const;
    }

    const state = transform(game, player);

    game = updatePlayer(game, player.id, (p) => ({ ...p, events: [] }));

    return { success: true, state, game } as const;
  };
}
