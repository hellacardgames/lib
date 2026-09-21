import { expect, test } from "vitest";
import { getOtherPlayer } from "./getOtherPlayer.js";

test("returns other player", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const { otherPlayer } = getOtherPlayer(game, "player-id-002");

  expect(otherPlayer.id).toBe("player-id-001");
});

test("throws when there is no other player", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  expect(() => getOtherPlayer(game, "player-id-001")).toThrow(
    "Other player not found.",
  );
});

test("throws when given playerId not found", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  expect(() => getOtherPlayer(game, "some-player-id")).toThrow(
    "Player some-player-id does not exist in game.",
  );
});
