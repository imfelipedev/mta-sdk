import timeout from "../utils/timout.js";

export default class MTA {
    constructor(ip, port, username, password, protocol) {
        this.ip = ip;
        this.port = port;
        this.username = username;
        this.password = password;
        this.protocol = protocol;
    }

    getURL() {
        return `${this.protocol}://${this.ip}:${this.port}`;
    }

    getAuthorization() {
        const insecure = `${this.username}:${this.password}`;
        const encoder = Buffer.from(insecure, "utf-8").toString("base64");
        return encoder;
    }

    async execute(resourceName, functionName, object) {
        const hostURL = this.getURL();
        const authorization = this.getAuthorization();
        const requestURL = `${hostURL}/${resourceName}/call/${functionName}`;
        const request = fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Basic ${authorization}`,
            },
            body: JSON.stringify(object),
        });

        const result = await timeout(request, 3000);
        return result;
    }
}
