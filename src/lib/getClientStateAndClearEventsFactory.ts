import { getCurrentPlayer } from "./getCurrentPlayer.js";
import { updatePlayer } from "./updatePlayer.js";

type Game = {
  players: readonly {
    id: string;
  }[];
  currentPlayerIndex: number;
};

export function getClientStateAndClearEventsFactory<
  TGame extends Game,
  TClientState extends object,
>(
  transform: (
    game: TGame,
    player: TGame["players"][number],
    currentPlayer: TGame["players"][number],
  ) => TClientState,
) {
  return (game: TGame, playerId: string) => {
    const player = game.players.find((p) => p.id === playerId);
    if (!player) {
      return { success: false, error: "playerNotFound" } as const;
    }

    const currentPlayer = getCurrentPlayer(game);
    const state = transform(game, player, currentPlayer);

    game = updatePlayer(game, player.id, (p) => ({ ...p, events: [] }));

    return { success: true, state, game } as const;
  };
}
