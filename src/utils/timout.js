export default async function timeout(promise, daley) {
    let timeout;
    const timeoutPromise = new Promise((_, reject) => {
        timeout = setTimeout(() => {
            reject("Promise execution timed out");
        }, daley);
    });

    try {
        return await Promise.race([promise, timeoutPromise]);
    } catch (error) {
        throw new Error(error);
    } finally {
        clearTimeout(timeout);
    }
}
