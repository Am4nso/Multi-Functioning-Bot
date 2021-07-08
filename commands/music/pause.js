module.exports = {
    name: "pause",
     execute(client, message) {
        const doc = client.players.get(message.guild.id);

        if (doc === undefined) {
            message.reply("Nothing is currently playing.").catch(console.error);
            return;
        }

        if (doc.connection.dispatcher.paused) {
            message.reply("The audio is already paused.").catch(console.error);
            return;
        }

        doc.connection.dispatcher.pause();

        message.reply("Paused.").catch(console.error);

    }

}
