const winston = require('winston');

// Set up a logger that writes to a file in /app/logs
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: '/app/logs/applog.log' })
    ]
});

// Example usage
logger.info('This is an info log');
logger.error('This is an error log');

module.exports = logger