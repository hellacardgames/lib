import { expect, test } from "vitest";
import { removePlayerFromNonTurnBasedGame } from "./removePlayerFromNonTurnBasedGame.js";

test("removes the given player", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
  };

  game = removePlayerFromNonTurnBasedGame(game, "player-id-002");
  expect(game.players).toEqual([player1, player3]);

  game = removePlayerFromNonTurnBasedGame(game, "player-id-003");
  expect(game.players).toEqual([player1]);

  game = removePlayerFromNonTurnBasedGame(game, "player-id-001");
  expect(game.players).toEqual([]);
});

test("throws when player does not exist in game", () => {
  const player1 = { id: "player-id-001" };

  const game = {
    players: [player1],
    currentPlayerIndex: 0,
  };

  expect(() =>
    removePlayerFromNonTurnBasedGame(game, "some-random-id"),
  ).toThrow("Player some-random-id does not exist in game.");
});
