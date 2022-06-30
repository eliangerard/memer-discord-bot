const Discord = require("discord.js");
module.exports = {
    name: "avatar",
    run: async (client, message, messi) => {
        user = message.mentions.users.first() || message.author;
        if(messi[1]==='server') url = message.guild.iconURL({dynamic: true});
        if (messi[1] === 'big' || messi[2] === 'big') url = "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + ".jpeg?size=512"
        if(messi[1] != 'server' && messi[1]!= 'big') url = user.displayAvatarURL({ dynamic: true })
        const embed = new Discord.MessageEmbed()
            .setTitle('Avatar de ' + user.username)
            .setColor("#202980")
            .setImage(url)
            .setTimestamp()
            .setFooter('Memer', client.botURL);
        message.reply({ embeds: [embed] });
    }
}