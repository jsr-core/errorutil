import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "https://deno.land/std@0.210.0/assert/mod.ts";
import { raise } from "./raise.ts";
import { tryOr, tryOrElse } from "./try_or.ts";

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

Deno.test("tryOrElse", async (t) => {
  const err = new Error("error");
  const resolve = Promise.resolve.bind(Promise);
  const reject = Promise.reject.bind(Promise);

  await t.step("sync", () => {
    type T = number;
    assertEquals(tryOrElse((): T => 1, () => 2), 1);
    assertEquals(tryOrElse((): T => raise(err), () => 2), 2);
  });

  await t.step("sync (error)", () => {
    type T = number;
    assertThrows(
      () => tryOrElse((): T => raise(err), () => raise(err)),
      Error,
      "error",
    );
  });

  await t.step("async", async () => {
    type T = Promise<number>;
    assertEquals(await tryOrElse((): T => resolve(1), () => 2), 1);
    assertEquals(await tryOrElse((): T => resolve(1), () => resolve(2)), 1);
    assertEquals(await tryOrElse((): T => reject(err), () => 2), 2);
    assertEquals(await tryOrElse((): T => reject(err), () => resolve(2)), 2);
    assertEquals(await tryOrElse((): T => raise(err), () => 2), 2);
    assertEquals(await tryOrElse((): T => raise(err), () => resolve(2)), 2);
  });

  await t.step("async (error)", async () => {
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
});
