const Listener = require(`../structs/bases/Listener`)
module.exports = class maxId extends Listener {
    constructor(...args) {
        super(...args, { name: `maxId`, enabled: true })
    }
    async run(id) {
        if (this.client.checker.latestActivityID === id) return
        this.client.checker.latestActivityID = id
        return;
    }
}