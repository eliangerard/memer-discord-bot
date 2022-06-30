const request = require('request');
module.exports = {
    name: "joke",
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
            return message.channel.send(body.joke);
          });
    }
}