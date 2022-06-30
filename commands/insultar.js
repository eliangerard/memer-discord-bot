const request = require('request');
let url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
let jsoner = { json: true };
module.exports = {
    name: "insultar",
    run: async (client, message, messi) => {
        var insultado = "";
        if (!messi[1]) return message.channel.send("A quién vas a insultar menso");
        if (messi[1] == "a" && messi[2] !== undefined) insultado = messi[2];
        else insultado = messi[1]
        request(url, jsoner, (error, res, datos) => {
            if (error) {
                return message.channel.send(console.log(error))
            };

            if (!error && res.statusCode == 200) {

                const options = {
                    method: 'POST',
                    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
                    qs: {
                        to: client.apis.traductor.default,
                        'api-version': '3.0',
                        includeAlignment: 'false',
                        from: 'en',
                        profanityAction: 'NoAction',
                        textType: 'plain'
                    },
                    headers: {
                        'content-type': 'application/json',
                        'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                        'x-rapidapi-key': client.apis.rapidapikey,
                        useQueryString: true
                    },
                    body: [{ Text: datos.insult }],
                    json: true
                };

                return request(options, function (error, response, body) {
                    if (error) throw new Error(error);
                    try {
                        mensaje = body[0].translations[0].text;
                        return message.channel.send(insultado + " " + mensaje);
                    } catch (error) {
                        mensaje = datos.insult;
                        return message.channel.send(insultado + " " + mensaje);
                    }
                });
            };
        });
    }
}