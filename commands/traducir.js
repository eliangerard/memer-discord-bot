const request = require('request');

module.exports = {
    name: "traducir",
    run: async (client, message, messi) => {
        var texto = "";
        var lang = client.apis.traductor.default;
        var desde = 1;
        if(messi[1]==="al"){
            lang = messi[2]
            desde = 3;
        }
            
        for (var j = desde; j < messi.length; j++) {
            texto += messi[j] + " ";
        }
        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            qs: {
                to: lang,
                'api-version': '3.0',
                includeAlignment: 'false',
                profanityAction: 'NoAction',
                textType: 'plain'
            },
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                'x-rapidapi-key': client.apis.rapidapikey,
                useQueryString: true
            },
            body: [{ Text: texto }],
            json: true
        };

        return request(options, function (error, response, body) {
            if (error) throw new Error(error);
            try {
                mensaje = body[0].translations[0].text;
                return message.channel.send(mensaje);
            } catch (error) {
                mensaje = "Revisa los prefijos de idiomas en los mensajes fijados";
                return message.channel.send(mensaje);
            }
        });
    }
}