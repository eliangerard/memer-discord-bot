const request = require('request');
let jsoner = { json: true };
module.exports = {
    name: "talk",
    aliases: ["t"],
    run: async (client, message, messi) => {
        var result="";
        if(!messi[1]){
            message.reply("Tienes que decir algo carnal")
            return;
        }
        for(var i = 1; i<messi.length; i++){
            result += messi[i]+" ";
        }
        const formData = {
            // Pass a simple key-value pair
            question: result
        }
        console.log(result)

        request.post({url:'https://boredhumans.com/process_chat2.php', formData: formData}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
        }
        body = body.substring(body.indexOf('>') +1 , body.indexOf('/')-1 );
        message.reply(body);
        });
    }
}