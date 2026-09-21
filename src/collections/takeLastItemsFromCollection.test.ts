import { expect, test } from "vitest";
import { takeLastItemsFromCollection } from "./takeLastItemsFromCollection.js";

test("takes requested number of items from collection", () => {
  const { collection, items } = takeLastItemsFromCollection([1, 2, 3], 2);
  expect(collection).toEqual([1]);
  expect(items).toEqual([2, 3]);
});

test("takes all items from collection when requested", () => {
  const { collection, items } = takeLastItemsFromCollection([1, 2, 3], 3);
  expect(collection).toEqual([]);
  expect(items).toEqual([1, 2, 3]);
});

test("throws when count is zero or negative", () => {
  expect(() => takeLastItemsFromCollection([1, 2, 3], 0)).toThrow(
    "Count must be a positive number.",
  );
  expect(() => takeLastItemsFromCollection([1, 2, 3], -1)).toThrow(
    "Count must be a positive number.",
  );
});
