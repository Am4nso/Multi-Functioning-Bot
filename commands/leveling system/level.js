const utils = require("../../utils");
const { tables } = require("./../../config.json").mysql;

module.exports = {
    name: "level",
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

        if (result[0].length === 0) {
            message.reply("Level 1").catch(console.error);
            return;
        }

        const xp = result[0][0].xp;

        message.reply("Level " + this.calculateLevel(xp)).catch(console.error);

    },

    calculateLevel(xp) {
        if (xp < 10) {
            return 1;
        }
        return Math.floor(Math.log2(xp/10)) + 1;
    }

}
