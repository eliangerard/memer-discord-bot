const request = require('request');

module.exports = {
    name: "analizar",
    run: async (client, message, messi) => {
        var image;
        try{
            image = message.attachments.first().url;
        }
        catch(e){
            message.reply("Tienes que subir una imagen")
            return;
        }
        const options = {
            method: 'GET',
            url: 'https://everypixel-api.p.rapidapi.com/keywords',
            qs: {
              url: image
            },
            headers: {
              'x-rapidapi-host': 'everypixel-api.p.rapidapi.com',
              'x-rapidapi-key': client.apis.rapidapikey,
              useQueryString: true
            }
          };
          
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var mensaje = "";
            var result = JSON.parse(body);
            console.log(result);
            for(var i = 0 ; i <Object.keys(result.keywords).length; i++){
                mensaje += result.keywords[i].keyword + " " + (Math.round(result.keywords[i].score*10000) / 100) +"\n";
            }
            return message.reply(mensaje);
        });
        //return message.reply("Ya se acabó la cuota de hecho me deben 0.006 USD gracias");
    }
}