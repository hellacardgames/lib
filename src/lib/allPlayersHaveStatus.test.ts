import { expect, test } from "vitest";
import { allPlayersHaveStatus } from "./allPlayersHaveStatus.js";

test("returns true when all players have the given status", () => {
  const game = {
    players: [{ status: "happy" }, { status: "happy" }, { status: "happy" }],
  } as const;

  expect(allPlayersHaveStatus(game, "happy")).toBe(true);
});

test("returns false when some players have the given status", () => {
  const game = {
    players: [{ status: "sad" }, { status: "happy" }, { status: "happy" }],
  } as const;

  expect(allPlayersHaveStatus(game, "happy")).toBe(false);
});
