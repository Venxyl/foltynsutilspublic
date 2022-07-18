const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const warnModel = require("../../model/warnModel")

module.exports = {
    name: "warn",
    description: "warn a user",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Provide a user to warn.", // Change able
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Provide a reason to warn this user", //Change able.
            type: "STRING",
        },
    ],

   /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction) {
        const { options, guild } = interaction;
        const reason        = options.getString("reason") || "No reason provided";
        const target      = options.getMember("target");


        new warnModel({
            userId: target.id,
            guildId: interaction.guild.id,
            moderatorId: interaction.user.id,
            reason,
        }).save();


        const Embed = new MessageEmbed()
        .setTitle("Action: Warning")
        .setDescription(`Warned ${target} \n\n reason:\`${reason}\``)
        let message = interaction.reply({embeds: [Embed]})

        const DM = new MessageEmbed()
        .setTitle("Action: Warning")
        .setDescription(`You have been warned in ${interaction.guild.name}, \n\n reason:\`${reason}\``)

        target.send({embeds: [DM]}).catch(()=>{console.log("⛔ Private message blocked by the user")});

        const log = new MessageEmbed()
        .setTitle("Logs | ⚠️ Warn ⚠️")
        .addFields(
            { name: "⚠️ Action", value: "Warn" },
            { name: "Author", value: `${interaction.member}` },
            { name:  "Member", value: `${target}` },
            { name: "Reason", value: `${reason}` },
        )
        .setColor("YELLOW")
        
        await guild.channels.cache.get("962444331845840926").send({ embeds: [log] });
       
    }
}