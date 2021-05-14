import test from "ava";
import { hello_world } from "../hello";

test("hello world", function (t) {
    t.assert(hello_world() === "Hello, world!");
});
