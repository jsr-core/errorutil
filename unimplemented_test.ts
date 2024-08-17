import { test } from "@cross/test";
import { assertThrows } from "@std/assert";
import { unimplemented, UnimplementedError } from "./unimplemented.ts";

test("unimplemented", () => {
  assertThrows(() => unimplemented(), UnimplementedError);
});
