import { test } from "@cross/test";
import { assertEquals, assertRejects, assertThrows } from "@std/assert";
import { raise } from "./raise.ts";
import { tryOrElse } from "./try_or_else.ts";

const err = new Error("error");
const resolve = Promise.resolve.bind(Promise);
const reject = Promise.reject.bind(Promise);

await test("tryOrElse (sync)", () => {
  type T = number;
  assertEquals(tryOrElse((): T => 1, () => 2), 1);
  assertEquals(tryOrElse((): T => raise(err), () => 2), 2);
});

await test("tryOrElse with Error (sync)", () => {
  type T = number;
  assertThrows(
    () => tryOrElse((): T => raise(err), () => raise(err)),
    Error,
    "error",
  );
});

await test("tryOrElse (async)", async () => {
  type T = Promise<number>;
  assertEquals(await tryOrElse((): T => resolve(1), () => 2), 1);
  assertEquals(await tryOrElse((): T => resolve(1), () => resolve(2)), 1);
  assertEquals(await tryOrElse((): T => reject(err), () => 2), 2);
  assertEquals(await tryOrElse((): T => reject(err), () => resolve(2)), 2);
  assertEquals(await tryOrElse((): T => raise(err), () => 2), 2);
  assertEquals(await tryOrElse((): T => raise(err), () => resolve(2)), 2);
});

await test("tryOrElse with Error (async)", async () => {
  type T = Promise<number>;
  await assertRejects(
    () => tryOrElse((): T => reject(err), () => reject(err)),
    Error,
    "error",
  );
  await assertRejects(
    () => tryOrElse((): T => reject(err), () => raise(err)),
    Error,
    "error",
  );
  await assertRejects(
    () => tryOrElse((): T => raise(err), () => reject(err)),
    Error,
    "error",
  );
  assertThrows(
    () => tryOrElse((): T => raise(err), () => raise(err)),
    Error,
    "error",
  );
});
