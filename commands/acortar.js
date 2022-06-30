const request = require('request');

module.exports = {
    name: "acortar",    
    run: async (client, message, messi) => {
        if(!messi[1])
            return message.reply("Ingresa una url")
        const options = {
            method: 'POST',
            url: 'https://url-shortener-service.p.rapidapi.com/shorten',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com',
              'x-rapidapi-key': client.apis.rapidapikey,
              useQueryString: true
            },
            form: {
              url: messi[1]
            }
          };
          
          request(options, function (error, response, body) {
              if (error) throw new Error(error);
              body = JSON.parse(body)
              return message.channel.send(body.result_url);
          });        
    }
}