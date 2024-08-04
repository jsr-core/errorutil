import { tryOrElse } from "./try_or_else.ts";
/**
 * Try to execute a function and return the result or a default value.
 *
 * ```ts
 * import { tryOr } from "@core/errorutil/try-or";
 * import { raise } from "@core/errorutil/raise";
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
