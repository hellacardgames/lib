import { expect, test } from "vitest";
import { tryGetOtherPlayer } from "./tryGetOtherPlayer.js";

test("returns other player", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const { otherPlayer, index } = tryGetOtherPlayer(game, "player-id-002");
  if (!otherPlayer) {
    throw new Error("Expected otherPlayer to exist.");
  }

  expect(otherPlayer.id).toBe("player-id-001");
  expect(index).toBe(0);
});

test("returns undefined and -1 when there is only one player", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const { otherPlayer, index } = tryGetOtherPlayer(game, "player-id-001");
  expect(otherPlayer).toBeUndefined();
  expect(index).toBe(-1);
});

test("throws when game has more than two players", () => {
  const game = {
    players: [
      { id: "player-id-001" },
      { id: "player-id-002" },
      { id: "player-id-003" },
    ],
  };

  expect(() => tryGetOtherPlayer(game, "player-id-001")).toThrow(
    "Game has more than two players.",
  );
});

test("throws when given playerId not found", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  expect(() => tryGetOtherPlayer(game, "some-player-id")).toThrow(
    "Player some-player-id does not exist in game.",
  );
});
