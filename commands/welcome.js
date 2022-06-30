module.exports = {
    name: "welcomeChannel",
    aliases: ["wchannel", "welcomes","bienvenidas"],
    run: async (client, message, messi) => {
        if(!messi[1])return message.reply("Indica el ID de un canal")
        if(isNaN(messi[1]))return message.reply("Ese no es el ID de un canal, ingresa el ID correcto")
        var rol = 0             
        try {
            await client.mongo.db(client.config.mongodb.dbname).collection("servers").findOne({guildid: message.guild.id}, (err,res)=>{
                if(err) throw err;
                if(res !=null){
                    if (!message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_GUILD')){
                        if(res.roleid) rol = res.roleid       
                        else 
                            return message.reply("Ha ocurrido un error al recuperar tu rol de la base de datos, puedes:\n-Establecer un rol\n-Verificar los datos de mongodb en el archivo config")
                        if(!message.member.roles.cache.has(rol)){
                            return message.reply("No tienes permisos para gestionar el canal de bienvenida, puedes:\n-Obtener un rol con permisos de `Administrador` o para `Gestionar el servidor`\n-Obtener el rol establecido con `admin || setrol`")       
                        }                        
                    }                                
                    client.mongo.db(client.config.mongodb.dbname).collection("servers").updateOne({guildid: message.guild.id}, {$set: {wchannelid : messi[1] } }, (err,res) => {
                        if(err) throw err;
                        message.react(client.emotes.success)
                        return message.reply("Canal de bienvenida actualizado")
                    })
                }
                else {
                    if (message.member.permissions.has('ADMINISTRATOR' || 'MANAGE_GUILD')){
                        client.mongo.db(client.config.mongodb.dbname).collection("servers").insertOne({guildid: message.guild.id, wchannelid : messi[1] }, (err,res) => {
                            if(err) throw err;
                            message.react(client.emotes.success)
                            return message.reply("Canal de bienvenida establecido")
                        })
                    }
                    else
                        return message.reply("Ha ocurrido un error al recuperar tu rol de la base de datos, puedes:\n-Establecer un rol\n-Verificar los datos de mongodb en el archivo config")
                }
            })            

        } catch(e){
            return message.reply("No tienes permisos para gestionar el canal de bienvenida, puedes:\n-Obtener un rol con permisos de `Administrador` o para `Gestionar el servidor`\n-Obtener el rol establecido con `admin || setrol`")
        }
    }
}