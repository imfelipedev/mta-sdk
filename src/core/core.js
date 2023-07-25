import API from "../modules/api.js";
import MTA from "../modules/mta.js";
import Socket from "../modules/socket.js";

export default class Core {
    constructor(ip = "none", port = "none", username = "none", password = "none", protocol = "https") {
        this.api = new API();
        this.socket = new Socket();
        this.mta = new MTA(ip, port, username, password, protocol);
    }
}
