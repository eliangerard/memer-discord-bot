const Discord = require("discord.js");

let page;
let totalPages;
let q;

module.exports = {
    name: "queue",
    aliases: ["q","cola"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        page = 0;
        totalPages = Math.ceil(queue.songs.length/10);

        const updateQueue = () => {
            q = `**Reproduciendo:** ${queue.songs[0].name} - \`${queue.songs[0].formattedDuration}\`\n`;
        
            for(let i = page*10; i < queue.songs.length > page*10+10 ? page*10+10 : queue.songs.length; i++){
                q += `**${i}.** ${queue.songs[i].name} - \`${queue.songs[i].formattedDuration}\`\n`
            }
        
            q += `*Página: ${(page+1)+"/"+totalPages}*`;
        }

        setTimeout(() => message.delete(), 15000)
        if(args.length > 1) return;
        if (!queue) {
            const embed = new Discord.MessageEmbed()
            .setTitle(client.emotes.error+" Error")
            .setColor("#FF0000")
            .setDescription("No se está reproduciendo nada")
            .setTimestamp()
            .setFooter('Memer', client.botURL)
            return message.channel.send( { embeds: [embed] } ).then(msg => {
                setTimeout(() => msg.delete(), 15000)
              })    
        }        
        updateQueue();

        const embed = new Discord.MessageEmbed()
        .setTitle(client.emotes.queue+" Cola")
        .setColor("#FFFFFF")
        .setDescription(`${q}`)
        .setTimestamp()
        .setFooter('Memer', client.botURL);
        message.channel.send( { embeds: [embed] } ).then(msg => {
            const handler = reaction => {
                if(reaction.message.id == msg.id){
                    if(reaction.emoji.name == "✔️"){                        
                        client.removeListener('messageReactionAdd', handler)
                        return msg.delete();
                    }    
                    if(reaction.emoji.name == "➡️"){
                        if(page == totalPages-1) page = 0;
                        else page++;
                        updateQueue();
                    }
                    if(reaction.emoji.name == "⬅️"){
                        if(page == 0) page = totalPages-1;
                        else page--;
                        updateQueue();
                    }
                    const embed = new Discord.MessageEmbed()
                    .setTitle(client.emotes.queue+" Cola")
                    .setColor("#FFFFFF")
                    .setDescription(`${q}`)
                    .setTimestamp()
                    .setFooter('Memer', client.botURL);
                    msg.edit(embed);
                }
            }
            msg.react('➡️');
            msg.react('⬅️');
            msg.react('✔️');
            client.on('messageReactionAdd', handler); 
          })    
    }
}