import timeout from "../utils/timout.js";

export default class MTA {
    constructor(core) {
        this.core = core;
    }

    getURL() {
        return `${this.core.protocol}://${this.core.ip}:${this.core.port}`;
    }

    getAuthorization() {
        const insecure = `${this.core.username}:${this.core.password}`;
        const encoder = Buffer.from(insecure, "utf-8").toString("base64");
        return encoder;
    }

    async execute(resourceName, functionName, ...args) {
        const hostURL = this.getURL();
        const authorization = this.getAuthorization();
        const requestURL = `${hostURL}/${resourceName}/call/${functionName}`;
        const request = fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Basic ${authorization}`,
            },
            body: args,
        });

        const result = await timeout(request, 3000);
        return result;
    }
}
