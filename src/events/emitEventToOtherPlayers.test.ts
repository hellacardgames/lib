import { expect, test } from "vitest";
import { emitEventToOtherPlayers } from "./emitEventToOtherPlayers.js";

type Game = {
  players: {
    id: string;
    events: {
      id: string;
      type: string;
    }[];
  }[];
};

test("emits event to all players except the given player", () => {
  let game: Game = {
    players: [
      { id: "player-id-001", events: [] },
      { id: "player-id-002", events: [] },
      { id: "player-id-003", events: [] },
    ],
  };

  game = emitEventToOtherPlayers(game, "player-id-002", { type: "some-event" });

  expect(game.players[0]?.events).toEqual([
    expect.objectContaining({ type: "some-event" }),
  ]);

  expect(game.players[2]?.events).toEqual([
    expect.objectContaining({ type: "some-event" }),
  ]);

  expect(game.players[1]?.events).toEqual([]);
});

test("throws if player does not exist in game", () => {
  const game: Game = {
    players: [
      { id: "player-id-001", events: [] },
      { id: "player-id-002", events: [] },
      { id: "player-id-003", events: [] },
    ],
  };

  expect(() =>
    emitEventToOtherPlayers(game, "some-random-id", { type: "some-event" }),
  ).toThrow("Player some-random-id does not exist in game.");
});
