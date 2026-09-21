import { expect, test } from "vitest";
import { getPlayer } from "./getPlayer.js";

test("returns player when player id exists in game", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const { player } = getPlayer(game, "player-id-001");

  expect(player.id).toBe("player-id-001");
});

test("throws when player id does not exist in game", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  expect(() => getPlayer(game, "some-random-id")).toThrow(
    "Player some-random-id does not exist in game.",
  );
});
