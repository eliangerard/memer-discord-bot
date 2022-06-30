const Discord = require("discord.js");
module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        
        setTimeout(() => message.delete(), 15000)
        if (!queue) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("No se está reproduciendo nada")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        if (queue.pause) {
            queue.resume()
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.success+" Resume")
            .setColor("#FFFFFF")
            .setDescription("Reanudando reproducción")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return await message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        queue.pause()
        const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.success+" Pause")
            .setColor("#FFFFFF")
            .setDescription("Pausando reproducción")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
    }
}