module.exports = {
    name: "resume",
    execute(client, message) {
        const doc = client.players.get(message.guild.id);

        if (doc === undefined) {
            message.reply("Nothing is currently playing.").catch(console.error);
            return;
        }

        if (!doc.connection.dispatcher.paused) {
            message.reply("The audio is not paused.").catch(console.error);
            return;
        }

        doc.connection.dispatcher.resume();

        message.reply("Resumed.").catch(console.error);
    }

}
