const { tables } = require("./../../config.json").mysql;

module.exports = {
    name: "xp",
    async execute(client, message, args) {
        if (args[0] === undefined) {
            message.reply("Please provide a user.").catch(console.error);
            return;
        }

        const user = args[0].replace(/[^0-9]/g, "");

        const result = await client.connection.query('SELECT `xp` FROM `' + tables.level + '` WHERE `user` = ?', [user]);

        let xp;

        if (result[0].length === 0) {
            xp = 0;
        } else {
            xp = result[0][0].xp;
        }

        message.reply("That user has " + xp + " xp.").catch(console.error);

    }

}
