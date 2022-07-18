const { Client, CommandInteraction, MessageEmbed } = require("discord.js");


module.exports = {
    name: "unban",
    description: "unban a user",
    permission: "BAN_MEMBERS",
    options: [
        {
            name:"user",
            description:"add userid to unban that user",
            type: "USER",
            required: true,

        },

    ],
    /**
     * 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
      async execute (interaction, client)  {
        const user = interaction.options.getUser('user');
        const Embeds = new MessageEmbed()
            .setDescription(`${user.tag} has been unbanned from the server.`)
        interaction.guild.members.unban(user).then((user) => {
            interaction.reply({ embeds: [Embeds], ephermal: true});

    }).catch(() => {
        interaction.reply({ content: "Please specify a valid banned userid" })
    })



        

     }





}
