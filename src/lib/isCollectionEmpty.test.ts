import { expect, test } from "vitest";
import { isCollectionEmpty } from "./isCollectionEmpty.js";

test("returns true if collection is empty", () => {
  expect(isCollectionEmpty([])).toBe(true);
});

test("returns false if collection is not empty", () => {
  expect(isCollectionEmpty([1])).toBe(false);
});
