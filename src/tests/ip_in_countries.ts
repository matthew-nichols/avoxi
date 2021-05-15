import test from "ava";
import { ip_in_countries } from "../ip_in_countries";

async function get_mock(ip: string) {
    switch (ip) {
        case "1.1.1.1":
            return { country: { iso_code: "AU" } };
        case "8.8.8.8":
            return { country: { iso_code: "US" } };
        case "127.0.0.1":
            return {};
        default:
            return null;
    }
}

test("ip_in_countries works", async function (t) {
    t.assert(await ip_in_countries("8.8.8.8", ["US"], get_mock));
    t.assert(!(await ip_in_countries("1.1.1.1", ["US"], get_mock)));
});

test("ip_in_countries should not pass if no data", async function (t) {
    t.assert(!(await ip_in_countries("127.0.0.1", ["US", "AU"], get_mock)));
    t.assert(!(await ip_in_countries("4.4.4.4", ["US", "AU"], get_mock)));
});

test("ip_in_countries multiple countries", async function (t) {
    t.assert(await ip_in_countries("8.8.8.8", ["US", "AU"], get_mock));
    t.assert(await ip_in_countries("8.8.8.8", ["AU", "US"], get_mock));
});
