import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { attempt } from "./attempt.ts";

test("attempt should return a Success<T> when the function is successful", () => {
  const result = attempt(() => 1);
  assertEquals(result, [undefined, 1]);
});

test("attempt should return a Failure<E> when the function is failed", () => {
  const result = attempt(() => {
    throw "err";
  });
  assertEquals(result, ["err", undefined]);
});
