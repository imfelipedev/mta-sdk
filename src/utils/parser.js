export default class Parser {
    constructor(buffer) {
        this.buffer = buffer;
        this.position = 0;
        this.flags = {
            0x0004: function (data, server) {
                server.players_count = data.read(2);
            },

            0x0008: function (data, server) {
                server.max_players_count = data.read(2);
            },

            0x0020: function (data, server) {
                try {
                    const name = data.readString();
                    const str = decodeURIComponent(escape(name));
                    server.server_name = str;
                } catch {
                    server.server_name = data.readString();
                }
            },

            0x0100: function (data, server) {
                server.version_name = data.readString();
            },

            0x0200: function (data, server) {
                server.passworded = data.read(1);
            },

            0x1000: function (data) {
                data.read(1);
            },

            0x2000: function (data) {
                data.read(4);
            },

            0x4000: function (data) {
                const items = data.read(1);
                data.setPosition(data.position + 2 * items);
            },

            0x8000: function (data) {
                data.read(1);
            },

            0x080000: function (data, server) {
                server.http_port = data.read(2);
            },
        };
    }

    setPosition(position) {
        if (position < this.buffer.length) {
            this.position = position;
        }
    }

    read(limit) {
        const slice = this.buffer.slice(this.position, this.position + limit);
        const hexString = slice.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
        this.position += limit;

        if (hexString.length === 0) {
            return 0;
        }

        return parseInt(hexString, 16);
    }

    readString() {
        let string = "";
        const length = this.read(1);
        for (let item = 0; item < length; item++) {
            const ch = this.read(1);
            if (ch !== 34 && ch !== 92 && ch !== 9 && ch !== 10) {
                string += String.fromCharCode(ch);
            }
        }
        return string;
    }

    parse() {
        const list = [];
        const flags = this.read(4);

        this.read(4);
        this.read(4);

        while (this.position + 6 <= this.buffer.length) {
            const server = {
                ip: "",
                port: 0,
                players_count: 0,
                max_players_count: 0,
                server_name: "",
                version_name: "",
                passworded: 0,
                http_port: 0,
            };

            const startPos = this.position;

            const startLength = this.read(2);

            const ipPieces = [];
            for (let x = 0; x < 4; x++) {
                const ip = this.read(1);
                const ipString = ip.toString();
                ipPieces.push(ipString);
            }

            ipPieces.reverse();

            server.ip = ipPieces.join(".");

            server.port = this.read(2);

            for (const flag in this.flags) {
                if ((flags & flag) !== 0) {
                    this.flags[flag](this, server);
                }
            }

            this.setPosition(startPos + startLength);

            list.push(server);
        }

        return list;
    }

    convert() {
        const count = this.read(2);
        if (count !== 0) {
            throw new Error("Not possibilite converte buffer");
        }

        const version = this.read(2);
        if (version !== 2) {
            throw new Error("Not possibilite converte buffer 2");
        }

        const servers = this.parse();
        return servers;
    }
}
