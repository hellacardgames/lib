import { expect, test } from "vitest";
import { tryGetPlayer } from "./tryGetPlayer.js";

test("returns player when player id exists in game", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const { player, index } = tryGetPlayer(game, "player-id-001");
  if (!player) {
    throw new Error("Expected player to exist.");
  }

  expect(player.id).toBe("player-id-001");
  expect(index).toBe(0);
});

test("returns undefined and -1 when player id does not exist in game", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const { player, index } = tryGetPlayer(game, "some-random-id");

  expect(player).toBeUndefined();
  expect(index).toBe(-1);
});
