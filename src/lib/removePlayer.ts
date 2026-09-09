import { removePlayerFromNonTurnBasedGame } from "../helpers/removePlayerFromNonTurnBasedGame.js";
import { removePlayerFromTurnBasedGame } from "../helpers/removePlayerFromTurnBasedGame.js";
import type { NonTurnBasedGame } from "../helpers/removePlayerFromNonTurnBasedGame.js";
import type {
  RemovePlayerFromTurnBasedGameResult,
  TurnBasedGame,
} from "../helpers/removePlayerFromTurnBasedGame.js";

type Game = TurnBasedGame | NonTurnBasedGame;

export function removePlayer<TGame extends TurnBasedGame>(
  game: TGame,
  playerId: string,
): RemovePlayerFromTurnBasedGameResult<TGame>;

export function removePlayer<TGame extends NonTurnBasedGame>(
  game: TGame,
  playerId: string,
): TGame;

export function removePlayer(game: Game, playerId: string) {
  if ("currentPlayerIndex" in game) {
    return removePlayerFromTurnBasedGame(game, playerId);
  }
  return removePlayerFromNonTurnBasedGame(game, playerId);
}
