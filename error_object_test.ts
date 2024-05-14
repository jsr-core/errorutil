import { assertEquals, assertInstanceOf } from "@std/assert";
import { fromErrorObject, toErrorObject } from "./error_object.ts";

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

Deno.test("toErrorObject", async (t) => {
  await t.step("Error", () => {
    const err = new Error("error");
    err.stack = "stack...";
    const obj = toErrorObject(err);
    assertEquals(obj, {
      proto: "Error",
      name: "Error",
      message: "error",
      stack: "stack...",
      attributes: {},
    });
  });

  await t.step("CustomError", () => {
    const err = new CustomError("error", "foo", 10);
    err.stack = "stack...";
    const obj = toErrorObject(err);
    assertEquals(obj, {
      proto: "CustomError",
      name: "ThisIsCustomError",
      message: "error",
      stack: "stack...",
      attributes: {
        foo: "foo",
        bar: 10,
      },
    });
  });
});

Deno.test("fromErrorObject", async (t) => {
  await t.step("Error", () => {
    const obj = toErrorObject(new Error("error"));
    obj.stack = "stack...";
    const err = fromErrorObject(obj);
    assertInstanceOf(err, Error);
    assertEquals(err.name, "Error");
    assertEquals(err.message, "error");
    assertEquals(err.stack, "stack...");
  });

  await t.step("CustomError", () => {
    const obj = toErrorObject(new CustomError("error", "foo", 10));
    obj.stack = "stack...";
    const err = fromErrorObject(obj);
    assertInstanceOf(err, Error);
    assertEquals(err.name, "ThisIsCustomError");
    assertEquals(err.message, "error");
    assertEquals(err.stack, "stack...");
    assertEquals((err as CustomError).foo, "foo");
    assertEquals((err as CustomError).bar, 10);
  });
});
