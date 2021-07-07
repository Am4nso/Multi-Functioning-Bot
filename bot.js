const discord = require("discord.js");
const fs = require("fs");
const {token} = require("./config.json");

const client = new discord.Client({
    ws: {intents: new discord.Intents(discord.Intents.ALL)}
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}


client.commands = new discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders.filter(file => !file.endsWith('.js'))) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
    for (const file of commandFolders.filter(file => file.endsWith('.js'))) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
}

client.players = new discord.Collection();

client.login(token);
