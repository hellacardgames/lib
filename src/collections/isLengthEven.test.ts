import { expect, test } from "vitest";
import { isLengthEven } from "./isLengthEven.js";

test("returns true when collection length is even", () => {
  expect(isLengthEven([1, 2])).toBe(true);
});

test("returns false when collection length is not even", () => {
  expect(isLengthEven([1, 2, 3])).toBe(false);
});
