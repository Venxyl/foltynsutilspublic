const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: 32767, partials: [ "CHANNEL" ] });
const { Token } = require("./config.json");



client.commands = new Collection()



require("../Structures/Handlers/events")(client);
require("../Structures/Handlers/commands")(client);


client.on("ready", () => {
    client.user.setActivity("/help", { 
      type: "STREAMING",
      url: "https://www.twitch.tv/Foltyn"
    })
})
client.on("messageCreate", async (message) => {
  if (message.channel.type === "DM" && !message.author.bot && message.content) {
    return client.channels.resolve("998661244741505044")?.send?.({ embeds: [ { title: "New DM", description: message.content ?? "", color: 0xFF000, timestamp: new Date(), author: { name: `${message.author.tag} (${message.author.id})`, icon_url: message.author.displayAvatarURL({ dynamic: true }) } } ] })?.catch?.(() => null);
  } 
})
client.login(Token);