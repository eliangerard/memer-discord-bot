const request = require('request');
const fs = require('fs');
function getName(stringer) {
    var name = "";
    for (var j = (stringer.length - 1); j >= 0; j--) {
        if (stringer.charAt(j) == '/') {
            name = stringer.substring((j + 1), stringer.length);
            return name;
        }
    }
    return "no se encontró";
}
module.exports = {
    name: "meme",
    run: async (client, message, messi) => {
        if (messi[1] === "subir") {
            var img = "";
            try {
                img = message.attachments.first().url;
                var memeName = getName(img);
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };

                download(img, memeName, function () {
                    const options = {
                        method: 'POST',
                        url: 'https://ronreiter-meme-generator.p.rapidapi.com/images',
                        headers: {
                            'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                            'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
                            'x-rapidapi-key': client.apis.rapidapikeys,
                            useQueryString: true
                        },
                        formData: {
                            image: {
                                value: fs.createReadStream(memeName),
                                options: {
                                    filename: memeName,
                                    contentType: 'application/octet-stream'
                                }
                            }
                        }
                    };

                    request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        return message.channel.send("Tu meme: " + memeName + " se ha subido con éxito y está listo para usarse :)")
                    });
                });

            } catch (error) {
                console.log(error);
                return message.channel.send("Sintaxis: meme subir y una imagen jeje");
            }
        }
        if (messi[1] === "generar") {
            if (!messi[2] || !messi[3] || !messi[4]) return message.channel.send("meme generar <name> <top> <bottom> <font size (opcional)> <font (opcional)> (reemplaza espacios con '_')");
            if (messi.length > 6) {
                var fuente = messi[6];
                for (var k = 7; k < messi.length; k++) {
                    fuente += " " + messi[k];
                }
                messi[6] = fuente;
            }
            var memeN = messi[2];
            while (messi[3].indexOf('_') != (-1)) {
                messi[3] = messi[3].replace('_', ' ');
            }
            while (messi[4].indexOf('_') != (-1)) {
                messi[4] = messi[4].replace('_', ' ');
            }
            var topText = messi[3];
            var bottomText = messi[4];
            var fontSize = '50';
            var font = 'Impact';
            if (messi[5] !== undefined) fontSize = messi[5];
            if (messi[6] !== undefined) font = messi[6];
            const options = {
                method: 'GET',
                url: 'https://ronreiter-meme-generator.p.rapidapi.com/meme',
                qs: {
                    top: topText,
                    bottom: bottomText,
                    meme: memeN,
                    font_size: fontSize,
                    font: font
                },
                headers: {
                    'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
                    'x-rapidapi-key': client.apis.rapidapikeys,
                    useQueryString: true
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                fs.writeFileSync('rs.txt', JSON.stringify(response));
            }).pipe(fs.createWriteStream('./meme.jpg').on('finish', function () {
                return message.channel.send({
                    files: [{
                        attachment: '/home/ec2-user/memer/meme.jpg',
                        name: 'meme.jpg'
                    }]
                });
            })
            );
        }
        if (messi[1] === "fuentes") {
            const options = {
                method: 'GET',
                url: 'https://ronreiter-meme-generator.p.rapidapi.com/fonts',
                headers: {
                    'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
                    'x-rapidapi-key': client.rapidapikeys,
                    useQueryString: true
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                var x = 0;
                body = body.substring(1, body.length - 1);
                while (body.indexOf(',') != (-1)) body = body.replace(',', '\n');
                fs.writeFile('fuentes.txt', body, function () {
                    return message.channel.send({
                        files: [{
                            attachment: '/home/ec2-user/memer/fuentes.txt',
                            name: 'fuentes.txt'
                        }]
                    });
                })
            });
        }
        if (messi[1] === "disponible") {
            const options = {
                method: 'GET',
                url: 'https://ronreiter-meme-generator.p.rapidapi.com/images',
                headers: {
                    'x-rapidapi-host': 'ronreiter-meme-generator.p.rapidapi.com',
                    'x-rapidapi-key': client.apis.rapidapikeys,
                    useQueryString: true
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                fs.writeFile('memes.txt', body, function () {
                    return message.channel.send({
                        files: [{
                            attachment: '/home/ec2-user/memer/memes.txt',
                            name: 'memes.txt'
                        }]
                    });
                });
            });
        }
    }
}