import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { raise } from "./raise.ts";
import { alterElse } from "./alter_else.ts";

test("alterElse should return a function result", () => {
  assertEquals(alterElse(() => 1, () => "err2"), 1);
});

test("alterElse should throws an alt when the function throws error", () => {
  assertThrows(
    () => alterElse(() => raise("err"), (err) => new Error(`new ${err}`)),
    Error,
    "new err",
  );
});
