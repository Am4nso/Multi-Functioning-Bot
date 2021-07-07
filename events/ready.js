const { createConnection } = require("mysql2/promise");
const { mysql } = require("./../config.json");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.connection = await createConnection({
            host: mysql.host,
            user: mysql.user,
            password: mysql.password,
            database: mysql.database,
            supportBigNumbers: true
        });

        console.log("The bot is now ready.");
    }
}