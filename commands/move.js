const Discord = require("discord.js");

module.exports = {
    name: "move",
    aliases: ["m","mover"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        setTimeout(() => message.delete(), 15000);
        
        if(isNaN(args[1]) || isNaN(args[2]) || args[1] > queue.songs.length || args[2] > queue.songs.length)
            return;
        
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

        const song = queue.songs[args[2]];
        queue.songs[args[2]] = queue.songs[args[1]];
        queue.songs[args[1]] = song;

        try {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.success+" Canciones movidotas")
            .setColor("#FFFFFF")
            
            message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        } catch (e) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("Descripción: "+e)
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
            });
        }
    }
}