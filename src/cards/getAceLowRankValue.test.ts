import { expect, test } from "vitest";
import { getAceLowRankValue } from "./getAceLowRankValue.js";

test("returns the correct value for the given rank", () => {
  expect(getAceLowRankValue("2")).toBe(2);
  expect(getAceLowRankValue("3")).toBe(3);
  expect(getAceLowRankValue("4")).toBe(4);
  expect(getAceLowRankValue("5")).toBe(5);
  expect(getAceLowRankValue("6")).toBe(6);
  expect(getAceLowRankValue("7")).toBe(7);
  expect(getAceLowRankValue("8")).toBe(8);
  expect(getAceLowRankValue("9")).toBe(9);
  expect(getAceLowRankValue("10")).toBe(10);
  expect(getAceLowRankValue("J")).toBe(11);
  expect(getAceLowRankValue("Q")).toBe(12);
  expect(getAceLowRankValue("K")).toBe(13);
  expect(getAceLowRankValue("A")).toBe(1);
});
