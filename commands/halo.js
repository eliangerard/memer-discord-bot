const request = require('request');
const fs = require('fs');
module.exports = {
    name: "halo",
    run: async (client, message, messi) => {
        if (!messi[2]) return message.reply('Indica un gamertag');
        var gt = messi[messi.length - 1];
        if (messi[1] === 'infinite') {
            var download = function (uri, filename, callback) {
                request.head(uri, function () {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            if(!messi[3] || messi[2]==="multiplayer"|| messi[2]==="multi"){
                return download('https://player.halo.autocode.gg/infinite/default/' + gt + '/', 'stats.jpg', function () {
                    message.channel.send({
                        files: [{
                            attachment: '/home/ec2-user/memer/stats.jpg',
                            name: 'stats.jpg'
                        }]
                    });
                });
            }
            if(messi[2]==="campaña" || messi[2]==="campaign"){
                return download('	https://infinite21.halodotapi.com/api/autocode/infinite21/card?gamertag=' + gt, 'statscam.jpg', function () {
                    message.channel.send({
                        files: [{
                            attachment: '/home/ec2-user/memer/statscam.jpg',
                            name: 'statscam.jpg'
                        }]
                    });
                });
            }
        }
        if (messi[1] === 'tmcc') {
            back = Math.ceil(Math.random() * (19 - 1) + 1);
            if (messi[2] === 'rank')
                return message.channel.send({ files: ['https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/' + gt + '/ranks.jpg?bg=' + back] });
            if (!messi[3] || messi[2] === 'xp') {
                return message.channel.send({ files: ['https://cryptum.halodotapi.com/tooling/cards/games/hmcc/stats/players/' + gt + '/xp.jpg?bg=' + back] });
            }
        }
        return message.reply('sintaxis: halo <infinite || tmcc> <si tmcc, ?xp o ?rank> <gamertag>');
    }
}