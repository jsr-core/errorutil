/**
 * Try to execute a function and return the result or execute another function.
 *
 * ```ts
 * import { tryOrElse } from "@core/errorutil/try-or-else";
 * import { raise } from "@core/errorutil/raise";
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
