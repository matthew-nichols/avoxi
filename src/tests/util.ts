import test from "ava";
import { user_assert } from "../util";

test("throws on false", function (t) {
    const e: Error & { status?: number; expose?: boolean } = t.throws(
        () => {
            user_assert(false, 400, "message");
        },
        { instanceOf: Error, message: "message" },
    );

    t.assert(e.expose === true);
    t.assert(e.status === 400);
});

test("doesn't throw on true", function (t) {
    user_assert(true, 400, "message");
    t.pass();
});
