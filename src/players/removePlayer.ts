import { removePlayerFromNonTurnBasedGame } from "./lib/removePlayerFromNonTurnBasedGame.js";
import { removePlayerFromTurnBasedGame } from "./lib/removePlayerFromTurnBasedGame.js";
import type { NonTurnBasedGame } from "./lib/removePlayerFromNonTurnBasedGame.js";
import type {
  RemovePlayerFromTurnBasedGameResult,
  TurnBasedGame,
} from "./lib/removePlayerFromTurnBasedGame.js";

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
