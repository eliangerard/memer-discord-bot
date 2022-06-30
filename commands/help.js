const Discord = require("discord.js");
module.exports = {
    name: "help",
    aliases: ["h"],
    run: async (client, message, messi) => {
        setTimeout(() => message.delete(), 15000)
        if (messi[1] === 'jugar') {
            const embed = new Discord.MessageEmbed()
                .setTitle("Jugar")
                .setColor("#FFFFFF")
                .setDescription('Juegos disponibles y como llamarlos')
                .setThumbnail(client.botURL)
                //Poker, Chess, Or Checkers in the Park, Betrayal, Fishington, Letter Tile, Words Snack, Doodle Crew, SpellCast, Awkword, Puttparty
                .addField("Poker", "poker")
                .addField("Chess", "chess")
                .addField("Or Checkers in the Park", "checkers")
                .addField("Betrayal", "betrayal")
                .addField("Fishington", "fishington")
                .addField("Letter Tile", "letter")
                .addField("Words Snack", "words")
                .addField("Doodle Crew", "doodle")
                .addField("SpellCast", "spellcast")
                .addField("Awkword", "awkword")
                .addField("Puttparty", "puttparty")
                .setTimestamp()
                .setFooter('Memer', client.botURL);

            return message.reply({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("Help")
            .setColor("#FFFFFF")
            .setDescription(`\`\`\`<...> Obligatorio, <?...> Opcional\`\`\``)
            .setThumbnail(client.botURL)
            .addField("avatar <?miembro || ?big> <?big>", ":small_blue_diamond: Muestra el avatar de ese miembro")
            .addField("crono - cronometro", " :small_orange_diamond: start - iniciar\t:small_orange_diamond: stop - fin\n :small_orange_diamond: vuelta\t:small_orange_diamond: pausar")
            .addField("chiste - chistesito", ":small_blue_diamond: Chiste gringo en español")
            .addField("chucknorris", ":small_blue_diamond: Dice algo del chuck norris")
            .addField("disconnect - dc - fuckoff - saquese - salte", "Desconecta al bot del canal en el que esté conectado")
            .addField("gif <?search>", ":small_blue_diamond: Envía un gif aleatorio o según la búsqueda")
            .addField("halo <infinite || tmcc> <?si tmcc, xp o rank> <gamertag>", ":small_blue_diamond: Muestra los stats según el juego de halo que indiques")
            .addField("hi", ":small_blue_diamond: Muestra los días que faltan para la campaña de Halo Infinite")
            .addField("insultar <miembro>", ":small_blue_diamond: Insulta a alguien")
            .addField("jugar <juego>", ":small_blue_diamond: Juega en discord a alguno de los siguientes juegos: Poker, Chess, Or Checkers in the Park, Betrayal, Fishington, Letter Tile, Words Snack, Doodle Crew, SpellCast, Awkword, Puttparty")
            .addField("join - spawn - caele <?ID del canal de voz>", ":small_blue_diamond: Ingresa al canal de voz en el que estés o especifiques")
            .addField("joke", ":small_blue_diamond: Chiste gringo")
            .addField("lyrics - letra <nombre, artista>", ":small_blue_diamond: Muestra la letra de la canción indicada")
            .addField("meme", " :small_orange_diamond: generar <meme> <top> <bottom> <?tamaño> <?fuente>\n :small_orange_diamond: subir <adjuntar imagen> (sube tu imagen)\n :small_orange_diamond: disponible (muestra las plantillas)\n[Puedes ver las predeterminadas aquí](http://apimeme.com/)\n :small_orange_diamond: fuentes (muestra las fuentes de texto disponibles)")
            .addField("say - di - repite <texto>", ":small_blue_diamond: Repite oraciones (más de una palabra) en el canal de voz")
            .addField("sticker <?search>", ":small_blue_diamond: Envía un sticker aleatorio o según la búsqueda")
            .addField("traducir <texto>", ":small_blue_diamond: Traduce el texto")
            .setTimestamp()
            .setFooter('Memer', client.botURL);

        return message.reply({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
          })    
    }
}