import net from "net";

export default class Socket {
    constructor() {
        this.server = net.createServer();
    }

    on(type, callback) {
        this.server.on(type, callback);
    }

    init(port = 1337, ip = "0.0.0.0", callback = () => {}) {
        this.server.listen(port, ip, callback);
    }
}
