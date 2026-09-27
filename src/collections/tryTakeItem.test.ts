import { expect, test } from "vitest";
import { tryTakeItem } from "./tryTakeItem.js";

test("returns item and mutated collection when index in range", () => {
  expect(tryTakeItem([1, 2, 3], 0)).toEqual({ collection: [2, 3], item: 1 });
  expect(tryTakeItem([1, 2, 3], 1)).toEqual({ collection: [1, 3], item: 2 });
  expect(tryTakeItem([1, 2, 3], 2)).toEqual({ collection: [1, 2], item: 3 });
});

test("returns undefined item and unmutated collection when index not in range", () => {
  expect(tryTakeItem([], 0)).toEqual({ collection: [], item: undefined });
  expect(tryTakeItem([1, 2, 3], 3)).toEqual({
    collection: [1, 2, 3],
    item: undefined,
  });
});
