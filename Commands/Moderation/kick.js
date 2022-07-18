const { CommandInteraction, MessageEmbed, Guild } = require("discord.js");


module.exports = {
    name: "kick",
    description: "Kicks a member.",
    permission: "KICK_MEMBERS",
    options: [
        {
            name: "target",
            description: "Select the target.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Select a reason.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {


        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason");
        await target.user.fetch();

        

        const response = new MessageEmbed()
            .setTitle("Succesfully kicked the target!")
            .setColor("RANDOM")
            .setThumbnail(target.user.avatarURL({ dynamic: true }))
            .setImage(target.user.bannerURL({ dynamic: true, size: 512 }) || "")
            .addFields(
                { name: "ID", value: target.user.id },
                { name: "Kick Reason", value: reason },
                { name: "Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                { name: "Account Created", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true },
            );

            const DM = new MessageEmbed()
            .setTitle("Action: Kick")
            .setDescription(`You have been kicked from ${interaction.guild.name}, \n\n Reason:\`${reason}\``)
            .setColor("YELLOW")

        interaction.reply({ embeds: [response], ephemeral: true });
        target.kick({ days: 0, reason: reason});


    }
}