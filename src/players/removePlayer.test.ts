import { expect, test } from "vitest";
import { removePlayer } from "./removePlayer.js";

test("uses turn-based implementation for turn-based game", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  const game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
  };

  const result = removePlayer(game, "player-id-003");
  expect(result).toEqual({
    game: {
      players: [player1, player2],
      currentPlayerIndex: 0,
    },
    turnChanged: false,
  });
});

test("uses non-turn-based implementation for non-turn-based game", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  const game = {
    players: [player1, player2, player3],
  };

  const result = removePlayer(game, "player-id-003");
  expect(result).toEqual({
    players: [player1, player2],
  });
});
