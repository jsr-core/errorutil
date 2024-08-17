import { test } from "@cross/test";
import { assertThrows } from "@std/assert";
import { raise } from "./raise.ts";

test("raise", () => {
  assertThrows(() => raise(new Error("error")), Error, "error");
});
