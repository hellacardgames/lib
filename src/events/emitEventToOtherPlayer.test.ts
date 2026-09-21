import { expect, test } from "vitest";
import { emitEventToOtherPlayer } from "./emitEventToOtherPlayer.js";

type Game = {
  players: {
    id: string;
    events: {
      id: string;
      type: string;
    }[];
  }[];
};

test("emits event to the other player", () => {
  let game: Game = {
    players: [
      { id: "player-id-001", events: [] },
      { id: "player-id-002", events: [] },
    ],
  };

  game = emitEventToOtherPlayer(game, "player-id-001", { type: "some-event" });

  expect(game.players[0]?.events).toEqual([]);

  expect(game.players[1]?.events).toEqual([
    expect.objectContaining({ type: "some-event" }),
  ]);
});

test("throws if more than two players", () => {
  const game: Game = {
    players: [
      { id: "player-id-001", events: [] },
      { id: "player-id-002", events: [] },
      { id: "player-id-003", events: [] },
    ],
  };

  expect(() =>
    emitEventToOtherPlayer(game, "player-id-001", { type: "some-event" }),
  ).toThrow("Game has more than two players.");
});

test("throws if other player not found", () => {
  const game: Game = {
    players: [{ id: "player-id-001", events: [] }],
  };

  expect(() =>
    emitEventToOtherPlayer(game, "player-id-001", { type: "some-event" }),
  ).toThrow("Other player not found.");
});
