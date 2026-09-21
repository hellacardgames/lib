import { expect, test } from "vitest";
import { peekItemsAtEvenIndices } from "./peekItemsAtEvenIndices.js";

test("returns items at even indices", () => {
  expect(
    peekItemsAtEvenIndices(["zero", "one", "two", "three", "four", "five"]),
  ).toEqual(["zero", "two", "four"]);
});

test("returns no items when collection is empty", () => {
  expect(peekItemsAtEvenIndices([])).toEqual([]);
});
