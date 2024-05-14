/**
 * Try to execute a function and return the result or a default value.
 *
 * ```ts
 * import { tryOr } from "https://deno.land/x/errorutil@$MODULE_VERSION/try_or.ts";
 * import { raise } from "https://deno.land/x/errorutil@$MODULE_VERSION/raise.ts";
 *
 * // Sync
 * console.log(tryOr(() => 1, 2)); // 1
 * console.log(tryOr(() => raise("err"), 2)); // 2
 *
 * // Async
 * console.log(await tryOr(() => Promise.resolve(1), 2)); // 1
 * console.log(await tryOr(() => Promise.reject("err"), 2)); // 2
 * ```
 */
export function tryOr<T>(fn: () => T, orValue: T): T;
export function tryOr<T>(
  fn: () => Promise<T>,
  orValue: T | Promise<T>,
): Promise<T>;
export function tryOr<T>(
  fn: () => T | Promise<T>,
  orValue: T,
): T | Promise<T> {
  return tryOrElse(fn, () => orValue);
}

/**
 * Try to execute a function and return the result or execute another function.
 *
 * ```ts
 * import { tryOrElse } from "https://deno.land/x/errorutil@$MODULE_VERSION/try_or.ts";
 * import { raise } from "https://deno.land/x/errorutil@$MODULE_VERSION/raise.ts";
 *
 * // Sync
 * console.log(tryOrElse(() => 1, () => 2)); // 1
 * console.log(tryOrElse(() => raise("err"), () => 2)); // 2
 *
 * // Async
 * console.log(await tryOrElse(() => Promise.resolve(1), () => 2)); // 1
 * console.log(await tryOrElse(() => Promise.reject("err"), () => 2)); // 2
 * ```
 */
export function tryOrElse<T>(fn: () => T, elseFn: (err: unknown) => T): T;
export function tryOrElse<T>(
  fn: () => Promise<T>,
  elseFn: (err: unknown) => T | Promise<T>,
): Promise<T>;
export function tryOrElse<T>(
  fn: () => T | Promise<T>,
  elseFn: (err: unknown) => T | Promise<T>,
): T | Promise<T> {
  try {
    const ret = fn();
    if (ret instanceof Promise) {
      return ret.catch((err) => elseFn(err));
    }
    return ret;
  } catch (err) {
    return elseFn(err);
  }
}
