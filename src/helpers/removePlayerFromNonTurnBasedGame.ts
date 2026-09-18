import { removeItemFromCollection } from "../lib/removeItemFromCollection.js";
import { getPlayer } from "../lib/getPlayer.js";

export type NonTurnBasedGame = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function removePlayerFromNonTurnBasedGame<
  TGame extends NonTurnBasedGame,
>(game: TGame, playerId: string): TGame {
  const { player } = getPlayer(game, playerId);

  game = { ...game, players: removeItemFromCollection(game.players, player) };

  return game;
}
