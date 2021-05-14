import { hello_world } from "./hello";
import koa from "koa";

const app = new koa();

app.use(ctx => (ctx.body = hello_world()));

app.listen(3000);
