const { DiscordTogether } = require('discord-together');

module.exports = {
    name: "jugar",
    run: async (client, message, messi) => {
        client.discordTogether = new DiscordTogether(client);
        if (!messi[1]) {
            return message.channel.send('Indica el juego que quieres jugar');
          }
          if (message.member.voice.channel) {
            if (messi[1] === 'doodle') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'doodlecrew').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'poker') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'chess') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'checkers') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'checkers').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'betrayal') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'betrayal').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'fishington') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'fishing').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'letter') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'lettertile').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'words') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'spellcast') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'spellcast').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'awkword') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'awkword').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
            if (messi[1] === 'puttparty') {
              client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'puttparty').then(async invite => {
                return message.channel.send(`${invite.code}`);
              });
            }
          }
          else {
            return message.channel.send('Tienes que estar en un canal de voz para jugar');
          }
    }
}