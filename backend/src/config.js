const config = {
    port: process.env.PORT || 3000,
    heartbeat: {
        interval: 30000,
        timeout: 60000
    }
};

module.exports = config;