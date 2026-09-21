import { expect, test } from "vitest";
import { isLengthOdd } from "./isLengthOdd.js";

test("returns true when collection length is odd", () => {
  expect(isLengthOdd([1, 2, 3])).toBe(true);
});

test("returns false when collection length is not odd", () => {
  expect(isLengthOdd([1, 2])).toBe(false);
});
