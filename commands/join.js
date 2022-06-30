const { entersState, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "join",
    aliases: ["spawn","caele"],
    run: async (client, message, messi) => {
        setTimeout(() => message.delete(), 15000)
        var canal = message.member.voice.channel;
        if (messi[1] != undefined) {
            canal = client.channels.cache.get(messi[1]);
        }
        try {
            aquiando = canal;
            voiceConnection = joinVoiceChannel({
                channelId: canal.id,
                guildId: canal.guild.id,
                adapterCreator: canal.guild.voiceAdapterCreator,
                selfDeaf: false
            })
            return message.reply('Pa qué soy bueno').then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        } catch (error) {
            aquiando = null;
            return message.reply('El canal de voz no existe').then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
    }
}