const { getSong } = require('genius-lyrics-api');
const Discord = require("discord.js");
function getParametros(mensajeCrudo) {
    var unido = mensajeCrudo[1];
    for (var j = 2; j < mensajeCrudo.length; j++) {
        unido += " " + mensajeCrudo[j];
    }
    unido = unido.split(',');
    return unido;
}

module.exports = {
    name: "lyrics",
    run: async (client, message, messi) => {
        try {
            var cancion;
            if (messi.length < 3) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Letra")
                    .setColor("#FF0000")
                    .setDescription(`\`\`\`lyrics <titulo, artista>\`\`\``)
                    .setThumbnail(client.botURL)
                    .setTimestamp()
                    .setFooter('Memer', client.botURL);

                return message.reply({ embeds: [embed] });
            }
            cancion = getParametros(messi);
            var options = {
                apiKey: client.apis.genius,
                title: cancion[0],
                artist: cancion[1],
                optimizeQuery: true
            };

            getSong(options).then((song) => {
                var partes;
                let letra;
                var inicio = 0;
                var fin = 1024;
              /*if (song.lyrics.length > 1024) {
                partes = Math.ceil(song.lyrics.length / 1023);
                letra = new Array(partes);
                for (var j = 0; j < (partes - 1); j++) {
                  letra[j] = song.lyrics.substr(inicio, fin)
                  inicio += 1023;
                  fin += 1023;
                }
                letra[(partes - 1)] = song.lyrics.substr(inicio, (song.lyrics.length - 1));
              }
              else {
                letra = song.lyrics;
                */const embed = new Discord.MessageEmbed()
                    .setTitle(song.title)
                    .setColor("#FFFFFF")
                    .setDescription(`[Letra en Genius](${song.url})`)
                    .setThumbnail(song.albumArt)
                    //.addField("Lyrics", letra[j])
                    .setTimestamp()
                    .setFooter('Memer', client.botURL);

                return message.reply({ embeds: [embed] });
                /*}
                for (var j = 0; j < letra.length; j++) {
                  if (j == 0) {
                    const embed = new Discord.MessageEmbed()
                      .setTitle(song.title)
                      .setColor("#FFFFFF")
                      .setDescription(`[Letra en Genius](${song.url})`)
                      .setThumbnail(song.albumArt)
                      .addField("Lyrics", letra[j])
                    message.reply({ embeds: [embed] });
                  }
                  else {
                    const embed = new Discord.MessageEmbed()
                      .setColor("#FFFFFF")
                      .addField("[" + j + "]", letra[j]);
                    message.channel.send({ embeds: [embed] });
                  }
                }*/
            });
        } catch (error) {
            return message.reply("Tenía tarea y no lo arreglé, saludos");
        }
    }
}