const request = require('request');
let jsoner = { json: true };
module.exports = {
    name: "chucknorris",
    run: async (client, message, messi) => {
        request("https://api.chucknorris.io/jokes/random", jsoner, (error, res, datos) => {
            if (error) {
                return message.channel.send(console.log(error))
            };

            if (!error && res.statusCode == 200) {
                return message.channel.send(datos.value);
            }
        });
    }
}