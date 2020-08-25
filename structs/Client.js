const { EventEmitter } = require('events')
const { webhooks } = require('../config.json')
const { RateLimitManager } = require(`@klasa/ratelimits`)
const Handler = require('./Handler')
const req = require('@aero/centra')
const { Logger } = require("@ayanaware/logger");
const Checker = require('./Checker')
require("./logger/Logger");
module.exports = class Client extends EventEmitter {
    constructor(options) {
        super(options);
        this.options = options;
        this.hooks = webhooks;
        this.ratelimits = new RateLimitManager(2000, 3)
        this.logger = Logger.get('Client');
        this.handler = new Handler(this)
        this.checker = new Checker(this)
    }
    async start() {
        this.logger.info(`starting...`)
        await this.handler.start()
        await this.checker.start()
        this.logger.info(`started!`)
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async post(data) {

        let res = []
        for (const url of this.hooks) {
            if (this.ratelimits.time) {
                const ratelimit = this.ratelimits.acquire(url);
                if (ratelimit.limited) {
                    await this.sleep(ratelimit.remainingTime)
                    await this.post(data)
                    return;
                }

                const token = ratelimit.take();
            }
            const resp = await req(url, `POST`).body(data).json()
            if (resp.retry_after) {
                await this.sleep(resp.retry_after)
                await this.post(data)
            }
            res.push(resp)
        }
        return res;
    }
}