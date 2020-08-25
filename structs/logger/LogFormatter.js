const logger = require("@ayanaware/logger");
const fecha = require("fecha");
const chalk = require("chalk");
class LogFormatter extends logger.Formatter {
    formatMessage(meta, message) {
        return `${this.formatTimestamp()} ${this.formatLevel(meta.level)}: [${this.formatName(meta.origin.name)}] ${message}`;
    }
    formatLevel(level) {
        switch (level) {
            case logger.DEBUG: {
                return chalk.yellowBright('debug');
            }
            case logger.ERROR: {
                return chalk.redBright('error');
            }
            case logger.OFF: {
                return chalk.whiteBright('off');
            }
            case logger.TRACE: {
                return chalk.magentaBright('trace');
            }
            case logger.WARN: {
                return chalk.yellow('warn');
            }
            case logger.INFO: {
                return chalk.blueBright('info');
            }
            default: {
                return chalk.gray('hurr durr');
            }
        }
    }
    formatError(meta, error) {
        return error.toString();
    }
    formatName(name) {
        return chalk.greenBright(name);
    }
    formatTimestamp() {
        return fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss A');
    }
}
module.exports = LogFormatter;
