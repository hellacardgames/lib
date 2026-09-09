import { removeItemFromCollection } from "../lib/removeItemFromCollection.js";
import { requirePlayer } from "../lib/requirePlayer.js";

export type NonTurnBasedGame = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function removePlayerFromNonTurnBasedGame<
  TGame extends NonTurnBasedGame,
>(game: TGame, playerId: string): TGame {
  const { player } = requirePlayer(game, playerId);

  game = { ...game, players: removeItemFromCollection(game.players, player) };

  return game;
}
