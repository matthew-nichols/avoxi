/**
 * Throws an error that Koa will expose to the user if the condition is false.
 * @param value must be truthy
 * @param status HTTP status code
 * @param user_message message to show to user
 */
export function user_assert(
    value: unknown,
    status: number,
    user_message: string,
): asserts value {
    if (!value) {
        const e: Error & { expose?: boolean; status?: number } = new Error(
            user_message,
        );
        e.expose = true;
        e.status = status;
        throw e;
    }
}
