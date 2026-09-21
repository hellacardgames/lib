import { expect, test } from "vitest";
import { peekLastItem } from "./peekLastItem.js";

test("returns last item in collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  const collection: readonly string[] = [item1, item2, item3];

  const item = peekLastItem(collection);

  expect(item).toBe(item3);
});

test("throws if collection is empty", () => {
  const collection: unknown[] = [];

  expect(() => peekLastItem(collection)).toThrow("Collection is empty.");
});
