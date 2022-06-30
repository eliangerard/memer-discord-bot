module.exports = {
    name : "admin",
    aliases : ["setrol"],
    run: async (client, message, messi) => {
        if (!message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_GUILD')) return message.reply("No tienes permisos para establecer un rol")
        if(!messi[1])return message.reply("Indica el ID del rol")
        if(isNaN(messi[1]))return message.reply("Este no es un ID, ingresa el ID de rol correcto")
        try {
            const data = {
                guildid : message.guild.id,
                roleid : messi[1]
            }
            client.mongo.db(client.config.mongodb.dbname).collection("servers").insertOne(data, (err,res) => {
                if(err) throw err;
                console.log("Document inserted\nResult: "+res)
            })

        } catch(e){
            return message.reply("Ha ocurrido un error al agregar el rol en la base de datos")
        }
    }
}