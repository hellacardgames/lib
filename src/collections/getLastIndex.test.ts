import { expect, test } from "vitest";
import { getLastIndex } from "./getLastIndex.js";

test("returns last index in collection", () => {
  expect(getLastIndex([1, 2, 3])).toBe(2);
});

test("returns -1 when collection is empty", () => {
  expect(getLastIndex([])).toBe(-1);
});
