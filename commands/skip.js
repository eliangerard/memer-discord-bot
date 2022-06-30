const Discord = require("discord.js");
module.exports = {
    name: "skip",
    aliases: ["s"],
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
        try {
            if(queue.songs.length == 1){
                queue.stop();

                const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.success + ` Finished`)
                .setDescription("Cola terminada")
                .setColor("#FFFFFF")
                .setTimestamp()
                .setFooter('Memer', client.botURL);
                
                return queue.textChannel.send({ embeds: [embed] }).then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                })
            }
            const song = queue.skip()            
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.success+" Skip")
            .setColor("#FFFFFF")
            message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
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