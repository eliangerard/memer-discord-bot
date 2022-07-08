const request = require('request');
const fetch = require('node-fetch');
const base64 = require('base-64');
const Discord = require("discord.js");
const fs = require('fs');

const download = (uri, filename, callback) => {
    request.head(uri, function(err, res, body){
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

module.exports = {
    name: "twdownload",
    aliases: ['twd'],
    run: async (client, message, messi) => {
        uri = "";
        if (messi.length <= 1) return;
        uri = messi[1];
        const encodedParams = new URLSearchParams();
        encodedParams.append("videoUrl", uri);

        const options = {
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              'X-RapidAPI-Key': client.config.apis.rapidapikey,
              'X-RapidAPI-Host': 'popular-video-downloader.p.rapidapi.com'
            },
            body: encodedParams
        };

        const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.success + " Descargando")
            .setColor("#00FF00")
        const downloading = await message.channel.send({ embeds: [embed] })

        const url = 'https://popular-video-downloader.p.rapidapi.com/twitter';

        fetch(url, options)
            .then(res => res.json() )
        .then(json => {
            console.log(json);
            if(json.UrlDownload)
            download(base64.decode(json.UrlDownload), 'twvideo.mp4', async ()=>{
                downloading.delete();
                await message.channel.send({
                    content: `Video de <@${message.author.id}>`,
                    files: [{
                        attachment: './video.mp4',
                        name: 'video.mp4'
                    }]
                }).catch(error => {
                    const embed = new Discord.MessageEmbed()
                    .setTitle(client.emotes.success + " Error")
                    .setDescription(error)
                    .setColor("#FF0000")
                    message.channel.send({ embeds: [embed] });
                })
            })
        });
    }
}