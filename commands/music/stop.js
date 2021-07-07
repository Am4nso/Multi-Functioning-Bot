module.exports = {
    name: "stop",
    execute(client, message) {

        const doc = client.players.get(message.guild.id);

        if (doc === undefined) {
            message.reply("Nothing is currently playing.").catch(console.error);
            return;
        }

        doc.connection.disconnect();

        client.players.delete(message.guild.id);

        message.reply("Stopping.").catch(console.error);
    }

}
