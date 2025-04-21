import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { asyncAttempt } from "./async_attempt.ts";

test("asyncAttempt should return a Success<T> when the async function is successful", async () => {
  const result = await asyncAttempt(async () => 1);
  assertEquals(result, [undefined, 1]);
});

test("asyncAttempt should return a Failure<E> when the async function is failed", async () => {
  const result = await asyncAttempt(async () => {
    throw "err";
  });
  assertEquals(result, ["err", undefined]);
});
