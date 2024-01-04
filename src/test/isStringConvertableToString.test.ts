import { expect, test, describe } from "bun:test";
import isStringConvertableToNumber from "~/utils/isStringConvertableToNumber";

describe("isStringConvertableToNumber", () => {
  test("2", () => {
    expect(isStringConvertableToNumber("2")).toBe(true);
  });

  test("10000000", () => {
    expect(isStringConvertableToNumber("10000000")).toBe(true);
  });

  test("", () => {
    expect(isStringConvertableToNumber("")).toBe(false);
  });

  test("NaN", () => {
    expect(isStringConvertableToNumber("NaN")).toBe(false);
  });

  test("-1", () => {
    expect(isStringConvertableToNumber("-1")).toBe(true);
  });
});
