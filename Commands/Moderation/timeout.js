const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "timeout",
    description: "Time out a member.",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "user", 
            description: "The member you want to timeout.",
            type: "USER",
            required: true
        },
        {
            name: "duration",
            description: "How long you want the timeout to be.",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "Reason for the timeout.",
            type: "STRING",
            required: true,
        }
    ],    
    /**
    * @param {CommandInteraction} interaction 
    */
   async execute(interaction) {
       const user = interaction.options.getUser("user");
       const length = interaction.options.getString("duration");
       const reason = interaction.options.getString("reason")
       const member = interaction.guild.members.cache.get(user.id);

       const response = new MessageEmbed()
             .setTitle("Succesfully timed-out the target!")
             .setColor("RANDOM")
             .setThumbnail(user.avatarURL({ dynamic: true }))
             .addFields(
                 { name: "ID", value: user.id },
                 { name: "Timeout Reason", value: reason },
                 { name: "Length", value: length}
            );
            

            const DM = new MessageEmbed()
            .setTitle("Action: **Timeout**")
            .setDescription(`You have been banned from ${interaction.guild.name}, \n\n Reason:\`${reason}\``)
            .setColor("RED")





         const timeInMs = ms(length);
          if (!timeInMs)
            return interaction.reply("Please specify a valid time.")

        
        interaction.reply({ embeds: [response], ephemeral: true});
        member.timeout(timeInMs, reason);

   }

}