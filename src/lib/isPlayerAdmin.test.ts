import { expect, test } from "vitest";
import { isPlayerAdmin } from "./isPlayerAdmin.js";

test("returns true if player is admin", () => {
  const game = {
    players: [
      { id: "player-id-001" },
      { id: "player-id-002" },
      { id: "player-id-003" },
    ],
  };

  expect(isPlayerAdmin(game, "player-id-001")).toBe(true);
});

test("returns false if player is not admin", () => {
  const game = {
    players: [
      { id: "player-id-001" },
      { id: "player-id-002" },
      { id: "player-id-003" },
    ],
  };

  expect(isPlayerAdmin(game, "player-id-002")).toBe(false);
});

test("throws if player does not exist", () => {
  const game = {
    players: [
      { id: "player-id-001" },
      { id: "player-id-002" },
      { id: "player-id-003" },
    ],
  };

  expect(() => isPlayerAdmin(game, "some-player-id")).toThrow(
    "Player some-player-id does not exist in game.",
  );
});
