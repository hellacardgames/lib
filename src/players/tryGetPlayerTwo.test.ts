import { expect, test } from "vitest";
import { tryGetPlayerTwo } from "./tryGetPlayerTwo.js";

test("returns player two", () => {
  const game = {
    players: [
      { id: "player-id-001" },
      { id: "player-id-002" },
      { id: "player-id-003" },
    ],
  };

  const playerTwo = tryGetPlayerTwo(game);

  if (!playerTwo) {
    throw new Error("Expected playerTwo to exist.");
  }

  expect(playerTwo.id).toBe("player-id-002");
});

test("returns undefined when player two not found", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const playerTwo = tryGetPlayerTwo(game);

  expect(playerTwo).toBeUndefined();
});
