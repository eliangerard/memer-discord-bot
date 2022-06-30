const request = require('request');
const fetch = require('node-fetch');
const fs = require('fs');
const Discord = require("discord.js");
let jsoner = { json: true };

const download = (uri, filename, callback) => {
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

module.exports = {
    name: "download",
    aliases: ['d'],
    run: async (client, message, messi) => {
        uri = "";
        if (messi.length <= 1) return;
        uri = messi[1];
        const url = 'https://socialdownloader.p.rapidapi.com/api/facebook/video?video_link='+encodeURIComponent(uri);

        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': client.config.apis.rapidapikey,
            'X-RapidAPI-Host': 'socialdownloader.p.rapidapi.com'
            }
        };

        const embed = new Discord.MessageEmbed()
          .setTitle(client.emotes.success + " Descargando")
          .setColor("#00FF00")
        const downloading = await message.channel.send({ embeds: [embed] })

        fetch(url, options)
	      .then(res => res.json() )
        .then(json => {
          console.log(json)
            download(json.body.videoHD, 'video.mp4', async ()=>{
                await message.channel.send({
                  content: `Video de <@${message.author.id}>`,
                  files: [{
                      attachment: './video.mp4',
                      name: 'video.mp4'
                  }]
                }).catch(error => {
                  download(json.body.video, 'video.mp4', async ()=>{
                    await message.channel.send({
                      content: `Video de <@${message.author.id}>`,
                      files: [{
                          attachment: './video.mp4',
                          name: 'video.mp4'
                      }]
                    }).catch(error => {
                      downloading.delete();
                      return message.channel.send("El video pesa mucho y no se armó con discord no dió chance");
                    });
                  })
                });
                downloading.delete();
                return message.delete();
            })
          })
	      .catch(err => console.error('error:' + err));
        
    }
}