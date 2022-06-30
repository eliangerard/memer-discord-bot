const Discord = require("discord.js");
module.exports = {
    name: "repeat",
    aliases: ["loop", "rp"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        setTimeout(() => message.delete(), 15000)
        if (!queue) {
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("No se está reproduciendo nada")
                .setTimestamp()
                .setFooter('Memer', client.botURL)
            return message.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        let mode = null
        switch (args[1]) {
            case "off":
                mode = 0
                break
            case "cancion":
                mode = 1
                break
            case "cola":
                mode = 2
                break
            case null:
                mode = 1;
                break;
            default:
                const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.error + " Error")
                .setColor("#FF0000")
                .setDescription("Ingresa una opción vailda (off, cancion, cola)")
                .setTimestamp()
                .setFooter('Memer', client.botURL)
                return message.channel.send({ embeds: [embed] }).then(msg => {
                    setTimeout(() => msg.delete(), 15000)
                  })    
        }
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Repitiendo la cola" : "Repitiendo la canción" : "Apagado"
        const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.repeat + " Loop")
            .setColor("#FFFFFF")
            .setDescription(`Modo de repetición establecido: \`${mode}\``)
            .setTimestamp()
            .setFooter('Memer', client.botURL)
        return message.channel.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
          })    
    }
}