const Discord = require("discord.js");
var Client = require('ftp');
var fs = require('fs');
var c = new Client();
var connected = false;
var mess = "...";
var anterior = "";
var config;
function leer() {
    var log;
    fs.readFile('/home/ec2-user/memer/minecraft/log.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var array = data.split(/\r?\n/)
        if(array[array.length - 2].includes('logged in with')){
            mess = array[array.length - 3]
        }
        else 
            mess = array[array.length - 2]
    });
}

function descargar() {
    try {
        c.get('/logs/latest.log', function (err, stream) {
            if (err) c.connect();
            //stream.once('close', function () { c.end(); });
            stream.pipe(fs.createWriteStream('/home/ec2-user/memer/minecraft/log.txt'));            
        });
        leer();
    }
    catch (e) {
        message.channel.send("El bot se ha desconectado del server, reintentando...")
        connected = false;
        try {
            c.connect(config)
            descargar();
        }
        catch (e) {
            return message.channel.send("Los datos para conectarse son incorrectos.")
        }
    }
}

function formatear(mensaje) {
    var definitivo = "";
    var nombre = "";
    if (mensaje.indexOf("*") != (-1)) {
        nombre = mensaje.substring(mensaje.indexOf("<"), mensaje.indexOf(">")+1);
        definitivo = mensaje.substring(mensaje.indexOf("*") + 1, mensaje.length);        
        return [nombre, definitivo]
    }
    if (mensaje.indexOf("<") != (-1)) {
        definitivo = mensaje.substring(mensaje.indexOf("<"), mensaje.length);
        definitivo = "**" + definitivo.substring(0, definitivo.indexOf(">") + 1) + "**" + definitivo.substring(definitivo.indexOf(">") + 1, definitivo.length)
        return definitivo
    }
    else {
        definitivo = mensaje.substring(mensaje.indexOf("]") + 1, mensaje.length);
        definitivo = "**" + definitivo.substring(definitivo.lastIndexOf(":") + 1, definitivo.length) + "**"
        return definitivo
    }

}
var refresh;
module.exports = {
    name: "minecraft",
    aliases: ["mc"],
    run: async (client, message, messi) => {
        config = client.config.minecraft
        if (!messi[1])
            return message.reply("Indica lo que quieres hacer")
        if (messi[1] === 'start' && !connected) {
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.repeat + " Conectando...")
                .setColor("#FFFFFF")
            message.channel.send({ embeds: [embed] })
            c.connect(config);
            try {
                c.on('ready', () => {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(client.emotes.success + " Conectado")
                        .setColor("#00FF00")
                    message.channel.send({ embeds: [embed] })
                    refresh = setInterval(() => {
                        connected = true
                        descargar()
                        if (mess != anterior) {
                            var wow = formatear(mess)
                            if (Array.isArray(wow)) {
                                console.log(wow)
                                message.channel.send(wow[0])
                                message.channel.send(wow[1])
                            } else {
                                if (!(mess.includes('Saved'))&&!(mess.includes('2161769'))&&!(mess.includes('2163612'))&&!(mess.includes('UUID'))&&!(mess.includes('java.lang'))&&!(mess.includes('lost connection'))&&!(mess.includes('BlockPos'))&&!(mess.includes('denined'))&&!(mess.includes('from'))&&!(mess.includes('Fetching packet'))&&!(mess.includes('but failed at'))&&!(mess.includes('class above belongs'))&&!(mess.includes('new advancement loading for'))&&!(mess.includes('Converted'))&&!(mess.includes('Disconnected')) && !(mess.includes('decreasing chunk')) && !(mess.includes('increasing chunk')) && !(mess.includes('server overloaded'))&& !(mess.includes('There are')) && !(mess.includes('moved too')) && !(mess.includes('logged in'))) {
                                    message.channel.send(formatear(mess))                                    
                                }
                            }
                            anterior = mess;
                        }

                    }, 5000)
                });
            } catch (e) {
                connected = false;
                const embed = new Discord.MessageEmbed()
                    .setTitle(client.emotes.error + " Error")
                    .setColor("#FF0000")
                    .setDescription("" + e)
                    .setTimestamp()
                    .setFooter('Memer', client.botURL)
                return message.channel.send({ embeds: [embed] })
            }
        }
        if (messi[1] === 'start' && connected) {
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.error + " Error")
                .setDescription("El servicio ya está iniciado")
                .setColor("#FF0000")
            message.channel.send({ embeds: [embed] })
        }
        /*if (messi[1] === 'stop') {
            c.end()
            clearInterval(refresh)
            connected = false;
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.stop+" Stop")
            .setColor("#FFFFFF")
            .setDescription("Se ha detenido el servicio")
            message.channel.send( { embeds: [embed] } )
        }
        if (messi[1] === 'abort') {
            c.destroy()
            clearInterval(refresh)
            connected = false;
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Abortar")
            .setColor("#FFFFFF")
            .setDescription("El servicio se ha detenido inmediatamente")
            message.channel.send( { embeds: [embed] } )
        }*/
    }
}
