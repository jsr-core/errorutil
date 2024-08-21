import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { raise } from "./raise.ts";
import { tryOr } from "./try_or.ts";

await test("tryOr executes the function and return the result", () => {
  assertEquals(tryOr(() => 1, 2), 1);
});

await test("tryOr returns the orValue if the function throws error", () => {
  assertEquals(tryOr(() => raise("err"), 2), 2);
});
