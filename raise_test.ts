import { assertThrows } from "https://deno.land/std@0.210.0/assert/mod.ts";
import { raise } from "./raise.ts";

Deno.test("raise", () => {
  assertThrows(() => raise(new Error("error")), Error, "error");
});
