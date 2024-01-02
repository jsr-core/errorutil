/**
 * Throw an error.
 *
 * This is function thus can be used as an expression.
 *
 * ```typescript
 * import { raise } from "./raise.ts";
 *
 * const fn = () => raise(new Error("fail"));
 * ```
 */
export function raise(err: unknown): never {
  throw err;
}
