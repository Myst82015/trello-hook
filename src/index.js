const Client = require(`./structs/Client`);
const { conf } = require(`./config`);
const client = new Client(conf)
client.start()
process.on(`SIGINT`, () => { 
client.stop()
})