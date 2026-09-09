import { expect, test } from "vitest";
import { requireOtherPlayer } from "./requireOtherPlayer.js";

test("returns other player", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const { player } = requireOtherPlayer(game, "player-id-002");

  expect(player.id).toBe("player-id-001");
});

test("throws when there is no other player", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  expect(() => requireOtherPlayer(game, "player-id-001")).toThrow(
    "Other player not found.",
  );
});

test("throws when given playerId not found", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  expect(() => requireOtherPlayer(game, "some-player-id")).toThrow(
    "Player some-player-id does not exist in game.",
  );
});
