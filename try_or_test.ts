import { assertEquals } from "jsr:@std/assert@0.225.1";
import { raise } from "./raise.ts";
import { tryOr } from "./try_or.ts";

Deno.test("tryOr", async (t) => {
  const err = new Error("error");
  const resolve = Promise.resolve.bind(Promise);
  const reject = Promise.reject.bind(Promise);

  await t.step("sync", () => {
    type T = number;
    assertEquals(tryOr((): T => 1, 2), 1);
    assertEquals(tryOr((): T => raise(err), 2), 2);
  });

  await t.step("async", async () => {
    type T = Promise<number>;
    assertEquals(await tryOr((): T => resolve(1), 2), 1);
    assertEquals(await tryOr((): T => resolve(1), resolve(2)), 1);
    assertEquals(await tryOr((): T => reject(err), 2), 2);
    assertEquals(await tryOr((): T => reject(err), resolve(2)), 2);
    assertEquals(await tryOr((): T => raise(err), 2), 2);
    assertEquals(await tryOr((): T => raise(err), resolve(2)), 2);
  });
});
