const { entersState, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "grab",
    aliases: ["agarrar", "pescar", "link"],
    run: async (client, message, messi) => {
        return message.author.send(client.distube.getQueue(message).currentLink);
    }
}