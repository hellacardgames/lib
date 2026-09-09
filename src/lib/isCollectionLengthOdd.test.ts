import { expect, test } from "vitest";
import { isCollectionLengthOdd } from "./isCollectionLengthOdd.js";

test("returns true when collection length is odd", () => {
  expect(isCollectionLengthOdd([1, 2, 3])).toBe(true);
});

test("returns false when collection length is not odd", () => {
  expect(isCollectionLengthOdd([1, 2])).toBe(false);
});
