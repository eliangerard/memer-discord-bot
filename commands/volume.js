const Discord = require("discord.js");
module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        setTimeout(() => message.delete(), 15000);
        if (!queue) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("No se está reproduciendo nada")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        const volume = parseInt(args[1])
        if (isNaN(volume)) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("Ingresa un número válido (0-100)")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
        queue.setVolume(volume)        
        const embed = new Discord.MessageEmbed()
        .setTitle(client.emotes.success+" Volumen cambiado")
        .setColor("#FFFFFF")
        .setDescription(`Establecido en: \`${volume}\``)
        .setTimestamp()
        .setFooter('Memer', client.botURL)
        message.channel.send( { embeds: [embed] } ).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        });
    }
}