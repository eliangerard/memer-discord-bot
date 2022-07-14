const Discord = require("discord.js");
let page = 0;
let totalPages = 3;
const embeds = [
    new Discord.MessageEmbed()
    .setTitle("❔ Help")
    .setColor("#FFFFFF")
    .setDescription(`\`\`\`<...> Obligatorio, <?...> Opcional\`\`\``)
    .setThumbnail(client.botURL)
    .addField("acortar <link>", "Acorta el link que se indique")
    .addField("ai <pizza || perro>", "Devuelve una pizza o perro generado por una IA")
    .addField("analizar <adjuntar imagen>", "Una IA analiza la imagen e indica lo que cree que es")
    .addField("autoplay <? on || off>", "Activa el autoplay en la reproducción")
    .addField("avatar <?big> <?@usuario>", "Muestra tu avatar o el del usuario que menciones")
    .addField("calculadora <operación || help>", "Resuelve la operación que le indiques")
    .addField("chiste", "Envía un chiste (originalmente en inglés) mal traducido")
    .addField("chucknorris", "Envía un dato increíble de chucknorris (en inglés)")
    .addField("clima <ciudad>", "Envía el pronóstico del clima para la ciudad indicada")
    .addField("crono <iniciar || pausar || vuelta || terminar>", "Permite utilizar un cronómetro")
    .addField("decide <opciones>", "Decide entre una serie de opciones separadas por espacio")
    .addField("fbd <link>", "Descarga y envía un video de facebook")
    .addField("filter <filtro>", "Aplica un filtro a la canción")
    .addField("gif <búsqueda>", "Envía un gif aleatorio según la búsqueda indicada")
    .addField("grab", "Envía por mensaje privado la canción que se está reproduciendo")
    .addField("halo (<tmcc> <rank || xp>) (<infinite> <campaña || multi>)", "Envía los stats del juego y sección indicada")
    .addField("help", "Muestra los comandos y su función en orden alfabético")
    .setTimestamp()
    .setFooter('Memer', client.botURL),

    new Discord.MessageEmbed()
    .setTitle("❔ Help")
    .setColor("#FFFFFF")
    .setDescription(`\`\`\`<...> Obligatorio, <?...> Opcional\`\`\``)
    .setThumbnail(client.botURL)
    .addField("insultar <?@usuario>", "Insulta al usuario mencionado")
    .addField("join <?id voiceChannel>", "Introduce al bot al canal de voz que indiques o en el que estés")
    .addField("joke", "Chiste en inglés, simplemente")
    .addField("jugar <juego || help>", "Juega en discord al juego que indiques")
    .addField("jump <# de Canción en cola>", "Salta a la canción que se indica en la cola")
    .addField("lyrics <artista, canción>", "Envía un link a la letra de la canción")
    .addField("meme", "Crea tu propio meme")
    .addField("minecraft <start>", "Inicializa el canal de texto para enviar el log del server de minecraft")
    .addField("nowplaying", "Envía la canción que se esté reproduciendo")
    .addField("pause", "Pausa la canción que se esté reproduciendo")
    .addField("play <búsqueda || link>", "Reproduce la canción indicada")
    .addField("playskip <búsqueda || link>", "Reproduce la canción indicada y saltea la que se esté reproduciendo")
    .addField("pon <búsqueda || link>", "Permite utilizar play y que el bot ingrese a un canal de texto predefinido")
    .addField("previous", "Reproduce la canción anterior a la que se esté reproduciendo")
    .addField("queue", "Muestra la cola de canciones")
    .addField("repeat <cola || cancion>", "Activa el loop en lo que se indique")
    .addField("resume", "Resume la canción que se esté reproduciendo")
    .setTimestamp()
    .setFooter('Memer', client.botURL),

    new Discord.MessageEmbed()
    .setTitle("❔ Help")
    .setColor("#FFFFFF")
    .setDescription(`\`\`\`<...> Obligatorio, <?...> Opcional\`\`\``)
    .setThumbnail(client.botURL)
    .addField("search <búsqueda>", "Busca un video en youtube y permite seleccionar alguno")
    .addField("seek <segundos>", "Salta la canción a los segundos indicados")
    .addField("setrol <ID del Rol>", "Establece un rol para los administradores del bot")
    .addField("shuffle", "Aleatoriza la cola de canciones")
    .addField("skip", "Saltea la canción que se esté reproduciendo")
    .addField("sticker <búsqueda>", "Envía un gif de tipo sticker aleatorio con la búsqueda ingresada")
    .addField("stop", "Finaliza la sesión de reproducción")
    .addField("talk <mensaje>", "Habla con una IA tontilla la verdad (En inglés)")
    .addField("traducir <?al> <?idioma> <mensaje>", "Traduce el mensaje indicado")
    .addField("ttt < @mención >", "Juega al gato con la persona que menciones")
    .addField("twd <link>", "Descarga y envía un video de twitter")
    .addField("volumen <porcentaje>", "Cambia el volumen de la reproducción")
    .addField("welcome <ID de canal>", "Establece un canal de texto como canal de bienvenidas")
    .addField("yt", "Inicia la actividad Youtube Together")
    .setTimestamp()
    .setFooter('Memer', client.botURL)
];

module.exports = {
    name: "help",
    aliases: ["h"],
    run: async (client, message, messi) => {
        setTimeout(() => message.delete(), 15000)

        return message.reply({ embeds: [embeds[0]] }).then(msg => {
            const handler = (reaction, user) => {
                if(reaction.message.id == msg.id && !user.bot){
                    if(reaction.emoji.name == "✅"){                        
                        client.removeListener('messageReactionAdd', handler)
                        return msg.delete();
                    }    
                    if(reaction.emoji.name == "➡️"){
                        if(page == totalPages-1) page = 0;
                        else page++;
                        updateQueue(queue);
                    }
                    if(reaction.emoji.name == "⬅️"){
                        if(page == 0) page = totalPages-1;
                        else page--;
                        updateQueue(queue);
                    }

                    msg.edit({ embeds: [embeds[page]] });
                }
            }
            msg.react('⬅️');
            msg.react('➡️');
            msg.react('✅');
            client.on('messageReactionAdd', handler); 
        })    
    }
}