
const { Logger } = require(`@ayanaware/logger`);
const LogFormatter = require(`./LogFormatter`);
Logger.setFormatter(new LogFormatter);
Logger.getDefaultTransport().setLevel(`DEBUG`);
