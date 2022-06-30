const Discord = require("discord.js");

module.exports = {
    name: "shuffle",
    aliases: ["mix", "revolver"],
    run: async (client, message, messi) => {
        const queue = client.distube.getQueue(message)
        setTimeout(() => message.delete(), 15000)

        try {
            queue.shuffle();
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.success + " Shuffle")
                .setColor("#FFFFFF")
                .setDescription("¡Queue revuelta!")
                .setTimestamp()
                .setFooter('Memer', client.botURL)
            return message.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        catch(e){
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error + " Error")
            .setColor("#FF0000")
            .setDescription(""+e)
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
    }
}