const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "queue",
    async execute(client, message) {

        if (!client.players.has(message.guild.id) || client.players.get(message.guild.id).queue.length === 0) {
            message.reply("The queue is empty!").catch(console.error);
            return;
        }

        const doc = client.players.get(message.guild.id);

        let string = "";

        let num = 1;

        for (let url of doc.queue) {
            string+=`${num}. ${url}\n`
            num++;
        }

        const embed = new MessageEmbed()
            .setColor('#6832e3')
            .setTitle(`Queue List`)
            .setDescription(string);

        message.reply({embed: embed}).catch(console.error);

    }

}
