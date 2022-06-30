const { DiscordTogether } = require('discord-together');
module.exports = {
    name: "youtube",
    aliases: ["yt"],
    run: async (client, message, messi) => {
        client.discordTogether = new DiscordTogether(client);
        if (!message.member.voice.channel) {
            return message.channel.send('Tienes que estar en un canal de voz para ver youtube');
        }
        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
        });
    }
}