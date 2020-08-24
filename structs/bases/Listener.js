class Listener {
    constructor(client, options = {}) {

        this.client = client;

        this.name = options.name;

        this.enabled = options.enabled;

    }
}

module.exports = Listener;