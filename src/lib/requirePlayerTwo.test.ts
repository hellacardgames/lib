import { expect, test } from "vitest";
import { requirePlayerTwo } from "./requirePlayerTwo.js";

test("returns player two", () => {
  const game = {
    players: [
      { id: "player-id-001" },
      { id: "player-id-002" },
      { id: "player-id-003" },
    ],
  };

  const playerTwo = requirePlayerTwo(game);

  expect(playerTwo.id).toBe("player-id-002");
});

test("throws when player two not found", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  expect(() => requirePlayerTwo(game)).toThrow("Player two not found.");
});
