module.exports = {
    name: "shutdown",
    execute(client, message) {
        message.reply("Shutting down.").catch(console.error);

        for (let connection of client.voice.connections.values()) {
            connection.disconnect();
        }

        client.destroy();
    }

}
