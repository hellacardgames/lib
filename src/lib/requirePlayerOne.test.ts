import { expect, test } from "vitest";
import { requirePlayerOne } from "./requirePlayerOne.js";

test("returns player one", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const playerOne = requirePlayerOne(game);

  expect(playerOne.id).toBe("player-id-001");
});

test("throws when player one not found", () => {
  const game = {
    players: [],
  };

  expect(() => requirePlayerOne(game)).toThrow("Player one not found.");
});
