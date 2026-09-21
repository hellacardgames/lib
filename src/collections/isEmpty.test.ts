import { expect, test } from "vitest";
import { isEmpty } from "./isEmpty.js";

test("returns true if collection is empty", () => {
  expect(isEmpty([])).toBe(true);
});

test("returns false if collection is not empty", () => {
  expect(isEmpty([1])).toBe(false);
});
