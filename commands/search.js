const Discord = require("discord.js");
module.exports = {
    name: "search",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        args.shift();
        const string = args.join(" ")
        setTimeout(() => message.delete(), 15000)
        if (!string) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("Ingrese una búsqueda válida")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        
        try {
            client.distube.search(string);
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