import { user_assert } from "./util";
import koa from "koa";
import koa_router from "@koa/router";
import { ip_in_countries } from "./ip_in_countries";

const app = new koa();
const router = new koa_router();

router.get("/ip_in_countries", async ctx => {
    const i = ctx.query.i;
    const c = ctx.query.c;
    const countries = typeof c === "string" ? [c] : c;

    user_assert(i, 400, "must have i (IP address) parameter");
    user_assert(
        typeof i === "string",
        400,
        "only one i (IP address) parameter is allowed",
    );
    user_assert(countries, 400, "must have c (ISO-code country) parameter");

    ctx.type = "json";
    ctx.body = String(await ip_in_countries(i, countries));
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
