import { expect, test } from "vitest";
import { tryGetPlayerOne } from "./tryGetPlayerOne.js";

test("returns player one", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const playerOne = tryGetPlayerOne(game);

  if (!playerOne) {
    throw new Error("Expected playerOne to exist.");
  }

  expect(playerOne.id).toBe("player-id-001");
});

test("returns undefined when player one not found", () => {
  const game = {
    players: [],
  };

  const playerOne = tryGetPlayerOne(game);

  expect(playerOne).toBeUndefined();
});
