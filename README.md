The stack is described in STACK.md.

# Interface

The API has one method, `GET /ip_in_countries`. There are two query string parameters:

-   `i`: the IP address to check.
-   `c`: ISO code of a country for the whitelist. This may be repeated multiple times.

The return is a JSON boolean value (aka, either the string "true" or the string "false").

"true" means that the country of the IP address is in the whitelist specified
by the `c` parameter. "false" will be returned if there is no data on the IP address
or if the IP address has no country data.

# Examples

`curl 'localhost:3000/ip_in_countries?i=1.1.1.1&c=US&c=AU'` returns `true`

`curl 'localhost:3000/ip_in_countries?i=1.1.1.1&c=US'` returns `false`
