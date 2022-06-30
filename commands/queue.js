const Discord = require("discord.js");
module.exports = {
    name: "queue",
    aliases: ["q","cola"],
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
        const q = queue.songs.map((song, i) => `${i === 0 ? "Reproduciendo:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        const embed = new Discord.MessageEmbed()
        .setTitle(client.emotes.queue+" Cola")
        .setColor("#FFFFFF")
        .setDescription(`${q}`)
        .setTimestamp()
        .setFooter('Memer', client.botURL)
        message.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
          })    
    }
}