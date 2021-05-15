import maxmind, { Reader, CountryResponse } from "maxmind";
import { user_assert } from "./util";

/**
 * A subset of {@link CountryResponse} for mocking.
 */
interface GetResult {
    country?: { iso_code: string };
}

const get_default = (() => {
    let database_promise: undefined | Promise<Reader<CountryResponse>>;

    /**
     * the default "get" function for {@link ip_in_countries}. Used for mocking.
     * @param ip An IP address.
     * @returns the maxmind data
     */
    async function get_default(ip: string): Promise<GetResult | null> {
        // parse the database on first use, tests don't use this
        // and just use a mock
        if (!database_promise) {
            database_promise = maxmind.open<CountryResponse>(
                "./GeoLite2/GeoLite2-Country.mmdb",
            );
        }

        return (await database_promise).get(ip);
    }
    return get_default;
})();

/**
 * Checks an IP address against a whitelist of countries.
 * @param ip_address An IP address to check.
 * @param iso_countries ISO code for countries to whitelist.
 * @param get Used for mocking.
 * @returns If the IP Address is located in the country whitelist.
 */
export async function ip_in_countries(
    ip_address: string,
    iso_countries: string[],
    get = get_default,
): Promise<boolean> {
    user_assert(
        maxmind.validate(ip_address),
        400,
        "i must be a valid IP address",
    );

    const result = await get(ip_address);
    if (!result) {
        // if there is no data for that IP address, deny
        return false;
    }

    // at least one whitelist entry must match
    return iso_countries.some(x => x === result.country?.iso_code);
}
