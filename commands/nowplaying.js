const Discord = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "reproduciendo"],
    run: async (client, message, messi) => {
        const queue = client.distube.getQueue(message)
        setTimeout(() => message.delete(), 15000)
        try {
            const status = queue => `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(", ") || "Off"}\` | Repitiendo: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda la cola" : "Esta canción" : "Nada"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.play + " Reproduciendo")
                .setColor("#FFFFFF")
                .addField("Canción: ", queue.songs[0].name)
                .addField("Duración: ", queue.songs[0].formattedDuration, true)
                .addField("Tiempo: ", queue.formattedCurrentTime, true)
                .addField("Solicitada por: ", "<@!" + queue.songs[0].user + ">", true)
                .addField("Ajustes: ", status(queue))
                .setThumbnail(queue.thumbnail)
                .setTimestamp()
                .setFooter('Memer', client.botURL)
            queue.textChannel.send({ embeds: [embed] }).then(msg => {
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