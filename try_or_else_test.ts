import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { raise } from "./raise.ts";
import { tryOrElse } from "./try_or_else.ts";

await test("tryOrElse executes the first function and return the result", () => {
  assertEquals(tryOrElse(() => 1, () => 2), 1);
});

await test("tryOrElse executes the second function and return the result if the first function throws error", () => {
  assertEquals(tryOrElse(() => raise("err"), () => 2), 2);
});

await test("tryOrElse throws error if the second function throws error", () => {
  assertThrows(
    () => tryOrElse(() => raise("err1"), () => raise(new Error("err2"))),
    Error,
    "err2",
  );
});
