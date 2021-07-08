const {prefix} = require("../config.json");

const userList = new Map();
const interval = 1500;

module.exports = {
    name: 'message',
    once: false,
    async execute(client, message) {

        if (message.author.bot) return;

        if (message.content.startsWith(prefix)) {
            const args = message.content.split(" ");
            const commandName = args.shift().replace(prefix, "").toLowerCase();
            try {
                client.commands.get(commandName).execute(client, message, args);
            } catch (e) {
                return;
            }
            return;
        }

        if(userList.has(message.author.id)) {

            const userData = userList.get(message.author.id);
            const difference = message.createdTimestamp - userData.lastMessage.createdTimestamp;

            if (difference < interval || userData.lastMessage.content === message.content) {
                userList.set(message.author.id, {
                    lastMessage: message
                })
                return;
            }
        }

        userList.set(message.author.id, {
            lastMessage : message
        });

        const results = await client.connection.query('SELECT * FROM `levels` WHERE `user` = ?', [message.author.id]);

        if (results[0].length === 0) {
            await client.connection.execute('INSERT INTO `levels` (user, xp) VALUES (?, 2)', [message.author.id]);
            return;
        }

        await client.connection.execute('UPDATE `levels` SET `xp` = `xp` + 2 WHERE `user` = ?', [message.author.id]);


    }
}