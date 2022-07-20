const Discord = require("discord.js");
module.exports = {
    name: "filter",
    aliases: ["filters","filtro"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
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
        if (args[1] === "off" && queue.filters?.length) queue.setFilter(false)
        else if (Object.keys(client.distube.filters).includes(args[1])) queue.setFilter(args[1])
        else if (args[1]){
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("El filtro no es válido")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(client.emotes.success+" Listo")
        .setColor("#FFFFFF")
        .setDescription(`Filtro aplicado actualmente: \`${queue.filters.join(", ") || "Ninguno"}\``)
        .setTimestamp()
        .setFooter('Memer', client.botURL)
        return message.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
          })    
    }
}