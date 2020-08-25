const req = require(`@aero/centra`)

module.exports = class Trello {
    constructor(key, token) {
        this.key = key;
        this.token = token;
        this.host = "https://api.trello.com";
    }

    get(uri) {
        return req(`${this.host}${uri}?key=${this.key}&token=${this.token}`).json()
        
    };
}
