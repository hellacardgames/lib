import { getCurrentPlayer } from "./getCurrentPlayer.js";
import { getPlayer } from "./getPlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
  readonly currentPlayerIndex: number;
};

export function isCurrentPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): boolean {
  const { player } = getPlayer(game, playerId);
  return getCurrentPlayer(game).id === player.id;
}
