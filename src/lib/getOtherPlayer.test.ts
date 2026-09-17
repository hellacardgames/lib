import { expect, test } from "vitest";
import { getOtherPlayer } from "./getOtherPlayer.js";

test("returns other player", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const otherPlayer = getOtherPlayer(game, "player-id-002");
  if (!otherPlayer) {
    throw new Error("Expected otherPlayer to exist.");
  }

  expect(otherPlayer.id).toBe("player-id-001");
});

test("returns undefined when there is only one player", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const otherPlayer = getOtherPlayer(game, "player-id-001");
  expect(otherPlayer).toBeUndefined();
});

test("throws when given playerId not found", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  expect(() => getOtherPlayer(game, "some-player-id")).toThrow(
    "Player some-player-id does not exist in game.",
  );
});
