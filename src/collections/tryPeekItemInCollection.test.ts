import { expect, test } from "vitest";
import { tryPeekItemInCollection } from "./tryPeekItemInCollection.js";

test("returns item in collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  const collection: readonly string[] = [item1, item2, item3];

  const item = tryPeekItemInCollection(collection, 2);

  expect(item).toBe(item3);
});

test("returns undefined if index is out of range", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  const collection: readonly string[] = [item1, item2, item3];

  expect(tryPeekItemInCollection(collection, -1)).toBeUndefined();
  expect(tryPeekItemInCollection(collection, 3)).toBeUndefined();
});
