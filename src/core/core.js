import API from "../modules/api.js";
import MTA from "../modules/mta.js";

export default class Core {
    constructor(ip = "none", port = "none", username = "none", password = "none", protocol = "https") {
        this.ip = ip;
        this.port = port;
        this.username = username;
        this.password = password;
        this.protocol = protocol;
        this.api = new API(this);
        this.mta = new MTA(this);
    }
}
