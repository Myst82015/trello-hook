const { join } = require(`path`);
const { promises: { lstat, readdir } } = require(`fs`);
const Collection = require(`./bases/Collection`);

class Handler {
  constructor(client) {
    this.client = client;
    this.events = new Collection();
  }

  registerEvent(event) {
    if (typeof event === `function`) event = new event(this.client);

    this.events.set(event.name, event);

    if (event.enabled) this.client.on(event.name, event.run.bind(event));
  }

  registerEvents(events) {
    if (!Array.isArray(events)) return;
    for (const event of events) {
      this.registerEvent(event);
    }
  }

  async registerEventsIn(path) {
    const files = await this.constructor.walk(`${path}`, {
      filter: (stats, file) => stats.isFile() && file.endsWith(`.js`)
    });
    const events = [];
    for (let event of files) {
      event = require(`${event[0]}`);
      events.push(event);
    }

    return this.registerEvents(events);
  }

  static async walk(dir, options = {}, results = new Map(), level = -1) {
    const stats = await lstat(dir);
    if (!options.filter || options.filter(stats, dir)) results.set(dir, stats);
    if (stats.isDirectory() && (typeof options.depthLimit === `undefined` || level < options.depthLimit))
      await Promise.all((await readdir(dir)).map((part) => Handler.walk(join(dir, part), options, results, ++level)));
    return results;
  }
  async start() {
    await this.registerEventsIn(`${process.cwd()}/src/listeners`)
    return true;
  }
}

module.exports = Handler;