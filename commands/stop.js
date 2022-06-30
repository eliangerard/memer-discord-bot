const Discord = require("discord.js");
module.exports = {
    name: "stop",
    aliases: ["fuckoff","leave"],
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
        queue.stop()
        const embed = new Discord.MessageEmbed()
        .setTitle(client.emotes.stop+" Detenido")
        .setColor("#FFFFFF")
        .setDescription("Se ha detenido la reproducción")
        .setTimestamp()
        .setFooter('Memer', client.botURL)
        message.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
          })    
    }
}