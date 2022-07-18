const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: "clear",
    description: "Deletes a certain amount of messages from a channel or member.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Specify the amount of messages you would like to clear from a channel or member.",
            type: "NUMBER",
            required: true,
        },
        {
            name: "target",
            description: "Select a member you'd like to clear messages from.",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("RANDOM");

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} messages from ${Target}.`);
                interaction.reply({embeds: [Response]});
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages=> {
                Response.setDescription(`🧹Cleared ${messages.size} messages from this channel.`);
                interaction.reply({embeds: [Response]});
            })
        }
    }
}