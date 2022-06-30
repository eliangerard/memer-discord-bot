const Discord = require("discord.js");
const request = require('request');
function getSun(epoch, timeOffset){
    var d = new Date(0);
    d.setUTCSeconds(epoch+timeOffset)
    return d.toTimeString().substring(0, d.toTimeString().indexOf("G"))
}
module.exports = {
    name: "clima",
    run: async (client, message, messi) => {
        if(!messi[1]){
            message.reply("Indica una ciudad");
            return;
        }
        var mess ="";
        for(var i = 1; i<messi.length; i++)
            mess += messi[i]+" "                   

        const options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/weather',
            qs: {
                q: mess,
                lang: 'sp',
                units: 'metric'
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': client.apis.rapidapikey,
                useQueryString: true
            }
        };
            
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var clima = JSON.parse(body)            
            if(clima.cod===200){                
                var amanecer = getSun(clima.sys.sunrise, clima.timezone)
                var anochecer = getSun(clima.sys.sunset, clima.timezone)
                console.log(amanecer + " "+anochecer)
                const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.map + " Clima en "+ clima.name + " - "+clima.sys.country)
                .setDescription(clima.weather[0].main+" / "+clima.weather[0].description)
                .setColor("#5555FF")
                .addField("Temperatura: ", clima.main.temp+"°")
                .addField("Sensación térmica: ", clima.main.feels_like+"°")
                .addField("Temp. Max: ", clima.main.temp_max+"°", true)
                .addField("Temp. Min: ", clima.main.temp_min+"°", true)
                .addField("Presión", clima.main.pressure+" bar", true)
                .addField("Humedad", clima.main.humidity+"%", true)                                
                .addField("Amanecer",amanecer, true)   
                .addField("Anochecer",anochecer, true)
                .setTimestamp()
                .setFooter('Memer', client.botURL)
                return message.channel.send({ embeds: [embed] })
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(client.emotes.error + " Error 404")
                .setDescription("No se encontró la ciudad")
                .setColor("#FF0000")                
                .setTimestamp()
                .setFooter('Memer', client.botURL)
            return message.channel.send({ embeds: [embed] })
        });
    }
}
