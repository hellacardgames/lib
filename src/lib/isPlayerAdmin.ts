import { requirePlayer } from "./requirePlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function isPlayerAdmin<TGame extends Game>(
  game: TGame,
  playerId: string,
): boolean {
  const { index } = requirePlayer(game, playerId);
  return index === 0;
}
