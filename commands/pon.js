const { entersState, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "pon",
    run: async (client, message, messi) => {
        if (!messi[1]) {
            return message.reply('que pongo mijo');
        }
        if (message.author.id == '832731781231804447') {
            canal = client.channels.cache.get('885715864190611486');
        } else {
            canal = client.channels.cache.get(message.member.voice.channelId);
        }
        voiceConnection = joinVoiceChannel({
            channelId: canal.id,
            guildId: canal.guild.id,
            adapterCreator: canal.guild.voiceAdapterCreator,
            selfDeaf: false
        });
        if (voiceConnection.status != VoiceConnectionStatus.Connected) {
            voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
        }
        if (voiceConnection.status === VoiceConnectionStatus.Connected) {
            var cancion = "";
            for (var j = 1; j < messi.length; j++) {
                cancion += (messi[j] + " ");
            }
            return message.channel.send('p ' + cancion);
        }
    }
}