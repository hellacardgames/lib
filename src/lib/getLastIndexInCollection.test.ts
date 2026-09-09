import { expect, test } from "vitest";
import { getLastIndexInCollection } from "./getLastIndexInCollection.js";

test("returns last index in collection", () => {
  expect(getLastIndexInCollection([1, 2, 3])).toBe(2);
});

test("returns -1 when collection is empty", () => {
  expect(getLastIndexInCollection([])).toBe(-1);
});
