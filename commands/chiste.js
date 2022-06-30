const request = require('request');
module.exports = {
    name: "chiste",
    aliases: ["chistecito","chistesillo"],
    run: async (client, message, messi) => {
        const options = {
            method: 'GET',
            url: 'https://v2.jokeapi.dev/joke/Any?type=single',
          };
      
          request(options, function (error, response, body) {
            var joke = "";
            if (error) throw new Error(error);
            body = JSON.parse(body)
            joke += body.joke;
            if(client.apis.traductor.default != "en"){
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
                body: [{ Text: joke }],
                json: true
              };
        
              return request(options, function (error, response, body) {
                if (error) throw new Error(error);
                try {
                  mensaje = body[0].translations[0].text;
                  return message.channel.send(mensaje);
                } catch (error) {
                  mensaje = datos.insult;
                  return message.channel.send(mensaje);
                }
              });
   
            }
            else return message.channel.send(joke)
                       //return message.channel.send(JSON.stringify(body.joke));
          });
    }
}