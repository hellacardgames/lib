import { changeTurn } from "../lib/changeTurn.js";
import { removeItemFromCollection } from "../lib/removeItemFromCollection.js";
import { requirePlayer } from "../lib/requirePlayer.js";

export type TurnBasedGame = {
  readonly players: readonly {
    readonly id: string;
  }[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export type RemovePlayerFromTurnBasedGameResult<TGame extends TurnBasedGame> = {
  readonly turnChanged: boolean;
  readonly game: TGame;
};

export function removePlayerFromTurnBasedGame<TGame extends TurnBasedGame>(
  game: TGame,
  playerId: string,
): RemovePlayerFromTurnBasedGameResult<TGame> {
  const { player, index } = requirePlayer(game, playerId);

  let turnChanged = false;

  if (index === game.currentPlayerIndex && game.players.length > 1) {
    game = changeTurn(game);
    turnChanged = true;
  }

  game = { ...game, players: removeItemFromCollection(game.players, player) };

  if (game.currentPlayerIndex > index) {
    game = { ...game, currentPlayerIndex: game.currentPlayerIndex - 1 };
  }

  return { turnChanged, game } as const;
}
