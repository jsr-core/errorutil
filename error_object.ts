import { is, PredicateType } from "@core/unknownutil";

export const isErrorObject = is.ObjectOf({
  proto: is.String,
  name: is.String,
  message: is.String,
  stack: is.OptionalOf(is.String),
  attributes: is.Record,
});

export type ErrorObject = PredicateType<typeof isErrorObject>;

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
