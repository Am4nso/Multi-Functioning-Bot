const {MessageEmbed} = require("discord.js");
const { tables } = require("./../../config.json").mysql;

module.exports = {
    name: "leaderboard",
    async execute(client, message) {

        const embed = new MessageEmbed()
            .setColor('#6832e3')
            .setTitle(`Leaderboard`);

        const result = await client.connection.query('SELECT * FROM `' + tables.level + '`');

        if (result[0].length === 0) {
            message.reply("No one in the server has xp.").catch(console.error);
            return;
        }

        const users = result[0].sort((a, b) =>  b.xp - a.xp);

        let string = "";

        let num = 1;

        for (let user of users) {
            if (num === 26) {
                break;
            }
            string+=`${num}. <@${user.user}> with ${user.xp} xp\n`;
            num++;
        }

        embed.setDescription(string);

        message.reply({embed:embed}).catch(console.error);

    }

}
