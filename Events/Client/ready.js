const { Client }= require("discord.js")
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("Folt Utils is now ready.")

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("[✅ Connected to the database!]")
        }).catch((err) => {
            console.log(err)
        })
    }

}