import { removeItem } from "../../collections/removeItem.js";
import { getPlayer } from "../getPlayer.js";

export type NonTurnBasedGame = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function removePlayerFromNonTurnBasedGame<
  TGame extends NonTurnBasedGame,
>(game: TGame, playerId: string): TGame {
  const { player } = getPlayer(game, playerId);

  game = { ...game, players: removeItem(game.players, player) };

  return game;
}
