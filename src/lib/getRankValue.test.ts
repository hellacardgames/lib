import { expect, test } from "vitest";
import { getRankValue } from "./getRankValue.js";

test("returns the correct value for the given rank", () => {
  expect(getRankValue("2")).toBe(2);
  expect(getRankValue("3")).toBe(3);
  expect(getRankValue("4")).toBe(4);
  expect(getRankValue("5")).toBe(5);
  expect(getRankValue("6")).toBe(6);
  expect(getRankValue("7")).toBe(7);
  expect(getRankValue("8")).toBe(8);
  expect(getRankValue("9")).toBe(9);
  expect(getRankValue("10")).toBe(10);
  expect(getRankValue("J")).toBe(11);
  expect(getRankValue("Q")).toBe(12);
  expect(getRankValue("K")).toBe(13);
  expect(getRankValue("A")).toBe(14);
});
