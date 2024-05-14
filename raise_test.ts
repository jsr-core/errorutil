import { assertThrows } from "@std/assert";
import { raise } from "./raise.ts";

Deno.test("raise", () => {
  assertThrows(() => raise(new Error("error")), Error, "error");
});
