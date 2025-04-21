import type { Result } from "./attempt.ts";

export type AsyncResult<T, E> = Promise<Result<T, E>>;

/**
 * Attempt to execute a async function and return a AsyncResult<T, E>.
 *
 * @param fn - The function to execute.
 * @returns A AsyncResult<T, E> where T is the return type of the async function and E is the error type.
 *
 * @example
 * ```ts
 * import { asyncAttempt } from "@core/errorutil/async_attempt";
 *
 * console.log(await asyncAttempt(async () => 1)); // [undefined, 1]
 * console.log(await asyncAttempt(async () => { throw "err" })); // ["err", undefined]
 * ```
 */
export async function asyncAttempt<T, E = unknown>(
  fn: () => Promise<T>,
): Promise<Result<T, E>> {
  try {
    return [undefined, await fn()];
  } catch (e) {
    return [e as E, undefined];
  }
}
