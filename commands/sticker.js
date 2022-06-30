const request = require('request');
let jsoner = { json: true };
module.exports = {
    name: "sticker",
    run: async (client, message, messi) => {
        var tag = "";
        if (messi.length > 1) {
            tag = messi[1];
            for (var j = 2; j < messi.length; j++) {
                tag += "+" + messi[j];
            }
        }
        request('https://api.giphy.com/v1/stickers/random?api_key='+client.apis.giphy+'&tag=' + tag, jsoner, (error, res, datos) => {
            if (error) {
                return message.channel.send(console.log(error))
            };

            if (!error && res.statusCode == 200) {
                try {
                    return message.channel.send(datos.data.images.original.url);
                } catch (error) {
                    return message.channel.send("No se encontró un gif con esos parámetros");
                }
            }
        });
    }
}