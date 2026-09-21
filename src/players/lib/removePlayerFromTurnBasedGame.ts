import { changeTurn } from "../changeTurn.js";
import { removeItem } from "../../collections/removeItem.js";
import { getPlayer } from "../getPlayer.js";

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
  const { player, index } = getPlayer(game, playerId);

  let turnChanged = false;

  if (index === game.currentPlayerIndex && game.players.length > 1) {
    game = changeTurn(game);
    turnChanged = true;
  }

  game = { ...game, players: removeItem(game.players, player) };

  if (game.currentPlayerIndex > index) {
    game = { ...game, currentPlayerIndex: game.currentPlayerIndex - 1 };
  }

  return { turnChanged, game } as const;
}
