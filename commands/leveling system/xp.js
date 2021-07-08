const utils = require("../../utils");
const { tables } = require("./../../config.json").mysql;

module.exports = {
    name: "xp",
    async execute(client, message, args) {

        if (args[0] === undefined) {
            message.reply("Please provide a user.").catch(console.error);
            return;
        }

        let member = await utils.fetchMember(message, args[0]);

        if (member === undefined) {
            message.reply("User not found.").catch(console.error);
            return;
        }

        const result = await client.connection.query('SELECT `xp` FROM `' + tables.level + '` WHERE `user` = ?', [member]);

        let xp;

        if (result[0].length === 0) {
            xp = 0;
        } else {
            xp = result[0][0].xp;
        }

        message.reply("That user has " + xp + " xp.").catch(console.error);

    }

}
