import { expect, test } from "vitest";
import { getAceHighRankValue } from "./getAceHighRankValue.js";

test("returns the correct value for the given rank", () => {
  expect(getAceHighRankValue("2")).toBe(2);
  expect(getAceHighRankValue("3")).toBe(3);
  expect(getAceHighRankValue("4")).toBe(4);
  expect(getAceHighRankValue("5")).toBe(5);
  expect(getAceHighRankValue("6")).toBe(6);
  expect(getAceHighRankValue("7")).toBe(7);
  expect(getAceHighRankValue("8")).toBe(8);
  expect(getAceHighRankValue("9")).toBe(9);
  expect(getAceHighRankValue("10")).toBe(10);
  expect(getAceHighRankValue("J")).toBe(11);
  expect(getAceHighRankValue("Q")).toBe(12);
  expect(getAceHighRankValue("K")).toBe(13);
  expect(getAceHighRankValue("A")).toBe(14);
});
