# errorutil

[![JSR](https://jsr.io/badges/@core/errorutil)](https://jsr.io/@core/errorutil)
[![Test](https://github.com/jsr-core/errorutil/workflows/Test/badge.svg)](https://github.com/jsr-core/errorutil/actions?query=workflow%3ATest)
[![Codecov](https://codecov.io/gh/jsr-core/errorutil/graph/badge.svg?token=O0cA5Xj5la)](https://codecov.io/gh/jsr-core/errorutil)

A utility pack for handling error.

## attempt

`attempt` is a function that executes a function and returns the result
(`[error: unknown, value: T]`). If the function is successful, it returns
`[undefined, value]`. If the function throws an error, it returns
`[error, undefined]`.

```ts
import { assertEquals } from "@std/assert";
import { attempt } from "@core/errorutil/attempt";

assertEquals(attempt(() => 42), [undefined, 42]);
assertEquals(
  attempt(() => {
    throw "err";
  }),
  ["err", undefined],
);
```

## ErrorObject

`ErrorObject` is a class that wraps an error object for serialization. It is
useful when you want to send an error object to a client or store it in a
database.

```ts
import {
  fromErrorObject,
  isErrorObject,
  toErrorObject,
} from "@core/errorutil/error-object";
import { assertEquals, assertInstanceOf } from "@std/assert";

class CustomError extends Error {
  foo: string;
  bar: number;
  constructor(message: string, foo: string, bar: number) {
    super(message);
    this.name = "ThisIsCustomError";
    this.foo = foo;
    this.bar = bar;
  }
}

const err = new CustomError("This is a custom message", "foo", 42);
err.stack = "stack..."; // set stack manually for testing

const errObj = toErrorObject(err);
assertEquals(errObj, {
  proto: "CustomError",
  name: "ThisIsCustomError",
  message: "This is a custom message",
  stack: "stack...",
  attributes: {
    foo: "foo",
    bar: 42,
  },
});

if (isErrorObject(errObj)) {
  const err = fromErrorObject(errObj);
  assertInstanceOf(err, Error); // err is NOT an instance of CustomError
  assertEquals(err.name, "ThisIsCustomError");
  assertEquals(err.message, "This is a custom message");
  assertEquals(err.stack, "stack...");
  assertEquals((err as CustomError).foo, "foo");
  assertEquals((err as CustomError).bar, 42);
}
```

## raise

`raise` is a function that throws an error. It is useful when you want to throw
an error in a single line.

```ts
import { assertThrows } from "@std/assert";
import { raise } from "@core/errorutil/raise";

const fn = () => raise(new Error("This is an error message"));
assertThrows(fn, Error, "This is an error message");
```

## tryOr / tryOrElse

`tryOr` and `tryOrElse` are functions that execute a function and return the
result. If the function throws an error, `tryOr` returns the default value, and
`tryOrElse` returns the result of the second function.

```ts
import { assertEquals } from "@std/assert";
import { tryOr } from "@core/errorutil/try-or";
import { tryOrElse } from "@core/errorutil/try-or-else";

const fn = () => {
  throw new Error("This is an error message");
};

const result1 = tryOr(fn, "default value");
assertEquals(result1, "default value");

const result2 = tryOrElse(fn, () => "default value");
assertEquals(result2, "default value");
```

## unimplemented

`unimplemented` is a function that is useful to mark a function that is not
implemented yet. It throws an `UnimplementedError` with a message
"unimplemented".

```ts
import { assertThrows } from "@std/assert";
import {
  unimplemented,
  UnimplementedError,
} from "@core/errorutil/unimplemented";

type Service = {
  get(id: string): Promise<string>;
  set(id: string, item: string): Promise<void>;
};

const mock: Service = {
  get: () => unimplemented(),
  set: () => unimplemented(),
};

assertThrows(() => mock.get("id"), UnimplementedError, "unimplemented");
assertThrows(() => mock.set("id", "item"), UnimplementedError, "unimplemented");
```

## unreachable

`unreachable` is a function that is useful to mark a code path that should never
be reached. It throws an `UnreachableError` with a message "unreachable".

```ts
import { assertThrows } from "@std/assert";
import { unreachable } from "@core/errorutil/unreachable";

type Animal = "dog" | "cat";
// The `unreachable(animal)` line below causes a Type error if we use the following line instead.
//type Animal = "dog" | "cat" | "bird";

function say(animal: Animal): void {
  switch (animal) {
    case "dog":
      console.log("dog");
      break;
    case "cat":
      console.log("dog");
      break;
    default:
      unreachable(animal);
  }
}

say("dog");
```

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
