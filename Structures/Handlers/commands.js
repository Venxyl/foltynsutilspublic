const { perms, Perms } = require("../../Structures/Validations/Permissions");
const { Client } = require("discord.js")
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Commands Loaded");

    CommandsArray = [];

    (await PG((`${process.cwd()}/Commands/*/*.js`).replace(/\\/g, '/'))).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "🔺 Failed", "Missing a name.")

        if (!command.type && !command.description) 
        return Table.addRow(command.name, "🔸 FAILED", "missing a description.");

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "🔺 Failed", "Permission is not valid.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "🔹 Successful.")
    });

    console.log(Table.toString());

    // PERMISSION CHECK //

    client.on('ready', async () => {
        const mainGuild = await client.guilds.cache.get("870407365508358184");
        mainGuild.commands.set(CommandsArray);
    
    });

}