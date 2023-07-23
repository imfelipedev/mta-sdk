import Parser from "../utils/parser.js";
import timeout from "../utils/timout.js";

export default class API {
    constructor(core) {
        this.core = core;
        this.cache = {};
    }

    async fetchAPI() {
        const request = fetch("https://master.mtasa.com/ase/mta/");
        const result = await timeout(request, 3000);
        const uint8Array = await result.arrayBuffer();
        const buffer = Buffer.from(uint8Array);
        return buffer;
    }

    async getAll() {
        const result = await this.fetchAPI();
        const parser = new Parser(result);
        return parser.convert();
    }

    async getFromIP(ip) {
        const result = await this.fetchAPI();
        const parser = new Parser(result);
        const convertedResult = parser.convert();
        const server = convertedResult.filter(server => server.ip === ip);
        return server;
    }

    async getFromIPandPort(ip, port) {
        const result = await this.fetchAPI();
        const parser = new Parser(result);
        const convertedResult = parser.convert();
        const server = convertedResult.filter(server => `${server.ip}:${server.port}` === `${ip}:${port}`);
        return server;
    }
}
