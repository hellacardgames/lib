import { expect, test } from "vitest";
import { updatePlayers } from "./updatePlayers.js";

test("performs the given update for all players", () => {
  let game = {
    players: [
      { id: "player-id-001", count: 1 },
      { id: "player-id-002", count: 2 },
      { id: "player-id-003", count: 3 },
    ],
  };

  game = updatePlayers(game, (p) => ({ ...p, count: p.count + 1 }));

  expect(game.players[0]?.count).toBe(2);
  expect(game.players[1]?.count).toBe(3);
  expect(game.players[2]?.count).toBe(4);
});
