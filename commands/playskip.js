const Discord = require("discord.js");
module.exports = {
    name: "playskip",
    aliases: ["ps"],
    inVoiceChannel: true,
    minecraftable: true,
    run: async (client, message, args) => {
        args.shift();
        const string = args.join(" ")
        setTimeout(() => message.delete(), 15000)       
        options = {
            skip : true
        };
        if (!string) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("Ingrese una canción o una URL")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        try {
            client.distube.play(message, string, options, client)            
        } catch (e) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("Descripción: "+e)
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
    }
}