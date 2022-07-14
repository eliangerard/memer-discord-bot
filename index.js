const fs = require('fs');
const { Intents } = require("discord.js");
const { DisTube } = require("distube");
const Discord = require("discord.js");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require('@distube/soundcloud')
const config = require("./config.json")
const discanvas = require('discanvas');
const {MongoClient} = require('mongodb');

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_BANS,
  ],
  restRequestTimeout: 30000,
  shards: "auto",
});
let waitingSearch = false, searchList = null;
client.waitingForResponse = (waiting, songs) => {
  waitingSearch = waiting;
  searchList = songs;
}

client.config = require("./config.json")
client.botURL = client.config.botURL;
client.apis = client.config.apis;
client.emotes = client.config.emoji
const uri = client.config.mongodb.stringKey
client.mongo = new MongoClient(uri);

var i = 0;
client.distube = new DisTube(client, {
  searchSongs: 10,
  emitNewSongOnly: true,
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
      clientId: client.config.spotifyClientID,
      clientSecret: client.config.spotifyClientSecret,
    },
  })]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("No se encontraron comandos");
  const jsFiles = files.filter(f => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("No se encontraron comandos");

  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`);
    console.log(`Comando ${file} cargado`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
  });
});

const main = async () => {
  await client.mongo.connect();
  console.log(await client.mongo.db().admin().listDatabases());
}

client.on('ready', () => {
  client.user.setActivity(config.presence.activity, {
    type: config.presence.type,
    url: config.presence.url
  });
  main()
  console.log(`${client.user.tag} está listo`)
  i = 0;
});
client.on('guildMemberAdd', async member => {  
  const welcome = await new discanvas.Welcome()
    .setAvatar('https://cdn.discordapp.com/avatars/' + member.id + '/' + member.user.avatar + '.png')
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setBackground('BACKGROUND', 'https://cdn.discordapp.com/attachments/819995259261288475/835055559941292032/style.jpg')
    //or : .setBackground('COLOR', '#ff5555')
    .setMainText('¡Bienvenido memer!')
    .setSecondText('Somos ' + member.guild.memberCount + ' changos ahora')
    .setCircleColor('#FFFFFF')
    .setMainTextColor('#FFFFFF')
    .setSecondTextColor('#FFFFFF')
    .setPseudoColor('#FFFFFF')
    .toWelcome()  
    try {
      await client.mongo.db(client.config.mongodb.dbname).collection("servers").findOne({guildid: member.guild.id}, (err,res)=>{
        if(err) throw err;       
        if(res != null)
          if(res.wchannelid)
            member.guild.channels.cache.get(res.wchannelid).send({files: [{ attachment: welcome.toBuffer(), name: 'welcome-' + member.id + '.png' }] });
      })                            
    } catch(e){
      console.log(e)
    }
    
})
client.on('guildMemberRemove', async member => {
  const leave = await new discanvas.Leave()
  .setAvatar('https://cdn.discordapp.com/avatars/' + member.id + '/' + member.user.avatar + '.png')
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setBackground('BACKGROUND', 'https://cdn.discordapp.com/attachments/819995259261288475/835055559941292032/style.jpg')
  //or : .setBackground('COLOR', '#ff5555')
  .setMainText('Adiósito')
  .setSecondText('chido ya bai')
  /*
  .setCircleColor('#ff5555')
  .setMainTextColor('#ff5555')
  .setSecondTextColor('#ff5555')
  .setPseudoColor('#ff5555')
  */
  .toLeave()
  try {
    await client.mongo.db(client.config.mongodb.dbname).collection("servers").findOne({guildid: member.guild.id}, (err,res)=>{
      if(err) throw err;       
      if(res != null)
        if(res.wchannelid)
          member.guild.channels.cache.get(res.wchannelid).send({files: [{ attachment: leave.toBuffer(), name: 'leave-' + member.id + '.png' }] });
        })                            
  } catch(e){
    console.log(e)
  }
});
client.on("messageCreate", async (message) => {
  const prefix = client.config.prefix;
  if(!message.content.startsWith(prefix)) return;
  
    
  if(message.content.includes('leche'))message.react('🧐')
  let messi = message.content.substring(prefix.length).split(' ');
  if(waitingSearch){
    waitingSearch = false;
    if(!isNaN(messi[0]) && messi[0] === 'cancelar')
      return;
    client.distube.play(message, searchList[messi[0]-1].url);
  }
  const command = messi[0].toLowerCase()  
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel && !cmd.minecraftable) return message.channel.send(`${client.emotes.error} | Tienes que estar en un canal de voz`)
  try {
    cmd.run(client, message, messi)
  } catch (e) {
    console.error(e)
    message.reply(`Error: ${e}`)
  }
});

const status = queue => `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(", ") || "Off"}\` | Repitiendo: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda la cola" : "Esta canción" : "Nada"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
  .on("playSong", async (queue, song) => {
    queue.setVolume(100);
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.play + " Reproduciendo")
      .setColor("#FFFFFF")
      .addField("Canción: ", song.name)
      .addField("Duración: ", song.formattedDuration, true)
      .addField("Solicitada por: ", "<@!" + song.user + ">", true)
      .addField("Ajustes: ", status(queue))
      .setThumbnail(client.botURL)
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    queue.textChannel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
    //tempm.delete();
  })
  .on("addSong", (queue, song) => {
    if(queue.songs.length == 0) return;
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.success + " Añadiendo")
      .setColor("#FFFFFF")
      .setDescription(`${song.name} - \`${song.formattedDuration}\` | añadida por: ${song.user}`)
      .setTimestamp()
      .setFooter('Memer', client.botURL);
      
    queue.textChannel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
  })
  .on("addList", (queue, playlist) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.success + ` Añadiendo \`${playlist.name}\``)
      .setColor("#FFFFFF")
      .setDescription(`¡Playlist añadida!\n${status(queue)}`)
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    queue.textChannel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
  })
  // DisTubeOptions.searchSongs = true
  .on("searchResult", (message, result) => {
    let i = 0;
    console.log(result);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Búsqueda`)
      .setColor("#FFFFFF")
      .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Ingresa cualquier otra cosa o espera 60 segundos para cancelar*`)
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    message.channel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", message => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.error + ` Búsqueda cancelada`)
      .setColor("#FFFFFF")
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    message.channel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
  })
  .on("searchNoResult", (message, query) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.error + ` Búsqueda`)
      .setDescription(`No se encontraron resultados para ${query}`)
      .setColor("#FFFFFF")
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    message.channel.send({ embeds: [embed] })
  })
  .on("searchInvalidAnswer", (message) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.error + ` Búsqueda`)
      .setDescription(`Ese número no está en la lista :)`)
      .setColor("#FFFFFF")
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    message.channel.send({ embeds: [embed] })
  })
  .on("error", (channel, e) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.error + " Error")
      .setColor("#FF0000")
      .setDescription("Descripción: " + e)
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    channel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
    console.error(e)
  })
  .on("empty", queue => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.sad + " Soledad")
      .setColor("#1111EE")
      .setDescription("No hay nadie en el canal de voz, saliendo...")
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    queue.textChannel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
  })
  .on("finish", queue => {
    const embed = new Discord.MessageEmbed()
      .setTitle(client.emotes.success + ` Finished`)
      .setDescription("Cola terminada")
      .setColor("#FFFFFF")
      .setTimestamp()
      .setFooter('Memer', client.botURL)
    queue.textChannel.send({ embeds: [embed] }).then(msg => {
      setTimeout(() => msg.delete(), 15000)
    })    
  })

client.login(config.token);