const { EventEmitter } = require(`events`)
const { webhooks } = require(`../config.json`)
const Queue = require(`./bases/Queue`)
const Handler = require(`./Handler`)
const req = require(`@aero/centra`)
const { Logger } = require("@ayanaware/logger");
const Checker = require(`./Checker`)
require("./logger/Logger");
module.exports = class Client extends EventEmitter {
    constructor(options) {
        super(options);
        this.options = options;
        this.hooks = webhooks;
        this.queue = new Queue()
        this.logger = Logger.get(`Client`);
        this.handler = new Handler(this)
        this.checker = new Checker(this)
    }
    async start() {
        this.logger.info(`starting...`)
        await this.handler.start().catch(err => this.logger.error(err))
        await this.checker.start().catch(err => this.logger.error(err))
        this.logger.info(`started!`)

        this.interval = setInterval(async () => {
            if (this.queue.size > 0) {
                await this.send(JSON.parse(this.queue.shift()))
            }
        }, 2000);
    }
    stop() {
        if (this.interval) this.interval.unref();
        this.client.cheker.stop()
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async post(data) {
        this.queue.push(JSON.stringify(data))
        return;
    }
    async send(data) {
        for (const hook of this.hooks) {
            const res = await req(hook, `POST`).query(`wait`, true).body(data).send()
            if (res.statusCode === 429) {
                this.logger.error(`Ratelimit! Adding to send queue again.`)
                return this.queue.push(JSON.stringify(data));
            }
        }
        return;
    }
}