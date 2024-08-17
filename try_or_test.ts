import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { raise } from "./raise.ts";
import { tryOr } from "./try_or.ts";

const err = new Error("error");
const resolve = Promise.resolve.bind(Promise);
const reject = Promise.reject.bind(Promise);

await test("tryOr (sync)", () => {
  type T = number;
  assertEquals(tryOr((): T => 1, 2), 1);
  assertEquals(tryOr((): T => raise(err), 2), 2);
});

await test("tryOr (async)", async () => {
  type T = Promise<number>;
  assertEquals(await tryOr((): T => resolve(1), 2), 1);
  assertEquals(await tryOr((): T => resolve(1), resolve(2)), 1);
  assertEquals(await tryOr((): T => reject(err), 2), 2);
  assertEquals(await tryOr((): T => reject(err), resolve(2)), 2);
  assertEquals(await tryOr((): T => raise(err), 2), 2);
  assertEquals(await tryOr((): T => raise(err), resolve(2)), 2);
});
