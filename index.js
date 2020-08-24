const Client = require(`./structs/Client`)
const { conf } = require(`./config`)
const Bot = new Client(conf)
Bot.start()