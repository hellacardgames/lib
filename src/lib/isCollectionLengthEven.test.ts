import { expect, test } from "vitest";
import { isCollectionLengthEven } from "./isCollectionLengthEven.js";

test("returns true when collection length is even", () => {
  expect(isCollectionLengthEven([1, 2])).toBe(true);
});

test("returns false when collection length is not even", () => {
  expect(isCollectionLengthEven([1, 2, 3])).toBe(false);
});
