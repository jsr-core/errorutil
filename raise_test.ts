import { assertThrows } from "jsr:@std/assert@0.225.1";
import { raise } from "./raise.ts";

Deno.test("raise", () => {
  assertThrows(() => raise(new Error("error")), Error, "error");
});
