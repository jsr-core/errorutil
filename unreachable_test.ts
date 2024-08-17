import { test } from "@cross/test";
import { assertThrows } from "@std/assert";
import { unreachable, UnreachableError } from "./unreachable.ts";

test("unreachable", () => {
  assertThrows(() => unreachable(), UnreachableError);
});
