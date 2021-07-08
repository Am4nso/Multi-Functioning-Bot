const ytdl = require('ytdl-core');

const using = new Set();

module.exports = {
    name: "play",
    async execute(client, message, args) {

        if (using.has(message.author.id)) {
            message.reply("Please wait before using this command.").catch(console.error);
            return;
        }

        if(message.member.voice.channel === null) {
            message.reply("You are not in a voice channel.").catch(console.error);
            return;
        }

        if (client.players.has(message.guild.id) && message.member.voice.channelID !== client.players.get(message.guild.id).connection.channel.id) {
            message.reply("I'm in another voice channel.").catch(console.error);
            return;
        }

        if (args.length === 0) {
            message.reply("Please provide a link to the audio. !play <url>");
            return;
        }

        using.add(message.author.id);

        const url = args[0];

        try {
            await ytdl.getInfo(url);
        } catch (e) {
            message.reply("Please type in a YouTube URL.").catch(console.error);
            using.delete(message.author.id);
            return;
        }

        const doc = client.players.get(message.guild.id);

        if (doc !== undefined) {
            doc.queue.push(url);
            client.players.set(message.guild.id, doc);
            message.reply("Added the audio to the queue.").catch(console.error);
            using.delete(message.author.id);
            return;
        }

        const joining = await message.reply("Playing...");

        message.member.voice.channel.join().then((connection) => {

            client.players.set(message.guild.id, {connection: connection, queue: []});

            using.delete(message.author.id);

            this.play(client.players, message, url).then(() => {
                joining.edit({content: `${message.author}, playing ` + url}).catch(console.error);
            }).catch(console.error);

        }).catch(console.error);
    },

    async play(players, message, url) {

        const doc = players.get(message.guild.id);

        doc.connection.play(ytdl(url)).once("finish", async () => {

            if (doc.queue.length === 0) {
                players.delete(message.guild.id);
                message.reply("The queue is empty. Leaving the voice channel.").catch(console.error);
                doc.connection.disconnect();
                return;
            }

            const next = doc.queue.shift();

            await this.play(players, message, next);

            message.channel.send("Playing now " + next).catch(console.error);

            players.set(message.guild.id, doc);

        }).once("close", () => {
            players.delete(message.guild.id);
        });

    }

}