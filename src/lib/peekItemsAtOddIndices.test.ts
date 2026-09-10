import { expect, test } from "vitest";
import { peekItemsAtOddIndices } from "./peekItemsAtOddIndices.js";

test("returns items at odd indices", () => {
  expect(
    peekItemsAtOddIndices(["zero", "one", "two", "three", "four", "five"]),
  ).toEqual(["one", "three", "five"]);
});

test("returns no items when collection is empty", () => {
  expect(peekItemsAtOddIndices([])).toEqual([]);
});
