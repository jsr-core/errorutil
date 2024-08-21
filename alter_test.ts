import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { raise } from "./raise.ts";
import { alter } from "./alter.ts";

test("alter should return a function result", () => {
  assertEquals(alter(() => 1, "err2"), 1);
});

test("alter should throws an alt when the function throws error", () => {
  assertThrows(
    () => alter(() => raise("err1"), new Error("err2")),
    Error,
    "err2",
  );
});
