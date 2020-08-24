const Trello = require('trello-events')
const { webhooks } = require('../config.json')
const Handler = require('./Handler')
const req = require('@aero/centra')
module.exports = class Client extends Trello {
    constructor() {
        super();
        this.routes = []
        this.handler = new Handler(this)
    }
    async start() {
        for (const url of webhooks) {
            const hook = this.parseWebhook(url)
            this.routes.push({ id: hook.id, token: hook.token, url: url })
        }
        await this.handler.start()
    }
    parseWebhook(text) {
        const m = text.match(/^https:\/\/(?:(?:canary|ptb).)?discordapp.com\/api\/webhooks\/(\d+)\/([\w-]+)\/?$/);
        if (!m) return null;
        return { id: m[1], token: m[2] };
    }
    async post(webhookID, webhookToken, data) {
        const res = await req(`https://discord.com/api/webhooks/${webhookID}/${webhookToken}?wait=true`, `POST`).body(data).send();
        return res;
    }
}