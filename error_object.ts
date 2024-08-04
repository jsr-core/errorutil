import { isString } from "@core/unknownutil/is/string";
import { isRecord } from "@core/unknownutil/is/record";
import { isObjectOf } from "@core/unknownutil/is/object-of";
import { asOptional } from "@core/unknownutil/as/optional";

export type ErrorObject = {
  proto: string;
  name: string;
  message: string;
  stack?: string;
  attributes: Record<string, unknown>;
};

export const isErrorObject: (x: unknown) => x is ErrorObject = isObjectOf({
  proto: isString,
  name: isString,
  message: isString,
  stack: asOptional(isString),
  attributes: isRecord,
});

/**
 * Convert an error to an error object
 */
export function toErrorObject(err: Error): ErrorObject {
  const { constructor, name, message, stack = undefined, ...rest } = err;
  return {
    proto: constructor.name,
    name,
    message,
    stack,
    attributes: rest,
  };
}

/**
 * Convert an error object to an error
 */
export function fromErrorObject(obj: ErrorObject): Error {
  return Object.assign(new Error(obj.message), {
    name: obj.name,
    stack: obj.stack,
    ...obj.attributes,
  });
}
