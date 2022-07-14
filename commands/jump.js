const Discord = require("discord.js");

module.exports = {
    name: "jump",
    run: async (client, message, messi) => {
        setTimeout(() => message.delete(), 15000)
        try {
            client.distube.jump(message, parseInt(messi[1])); 
            const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emotes.success} Salteando a la canción #${parseInt(messi[1])}`)
            .setColor("#FFFFFF")
            message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        catch (e) {
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("" + e)
                .setTimestamp()
                .setFooter('Memer', client.botURL)
            queue.textChannel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
    }
}