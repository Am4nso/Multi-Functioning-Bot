module.exports = {
    name: "shutdown",
    execute(client, message) {

        message.reply("Shutting down.").then(() => {
            for (let connection of client.voice.connections.values()) {
                connection.disconnect();
            }
            client.destroy();
        });

    }

}
