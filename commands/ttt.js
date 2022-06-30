module.exports = {
    name: "ttt",
    aliases: ["gato","#"],
    run: async (client, message, messi) => {
        counter = 0        
        if(!messi[1]){
            message.reply("Desafía a alguien mencionándolo en el mensaje O.o")        
            return
        }
        try{
            players = [message.author.id,message.mentions.users.first().id]
        } catch(e){
            message.reply("Tienes que mencionarlo (@Persona)")
            return
        }
        if(players[0] == players[1])
            return message.reply("Chico listo e")            
        match = "<@"+players[0]+"> vs <@"+players[1]+">\n"
        turn = false        
        full = false
        game = [0,0,0
            ,0,0,0
            ,0,0,0]
        ended = false
        await message.channel.send(match+"◻️◻️◻️\n◻️◻️◻️\n◻️◻️◻️").then(  function (message){
            const handler = (reaction, user) => {                
                if(reaction.message.id == message.id && (user.id == players[0] || user.id == players[1])){
                    if(reaction.emoji.name == "❌"){                        
                        client.removeListener('messageReactionAdd', handler)
                        return message.reply("Juego cancelado por <@"+user.id+">")
                    }        
                    if(user.id === players[turn?1 : 0]){                        
                        selected = 0
                        if(reaction.emoji.name == "1️⃣") selected = 1
                        if(reaction.emoji.name == "2️⃣") selected = 2
                        if(reaction.emoji.name == "3️⃣") selected = 3
                        if(reaction.emoji.name == "4️⃣") selected = 4
                        if(reaction.emoji.name == "5️⃣") selected = 5
                        if(reaction.emoji.name == "6️⃣") selected = 6
                        if(reaction.emoji.name == "7️⃣") selected = 7
                        if(reaction.emoji.name == "8️⃣") selected = 8
                        if(reaction.emoji.name == "9️⃣") selected = 9
                        if(game[selected-1]==0) game[selected-1] = turn ? 3 : 2
                        else{
                            message.edit(message.content+"\nPulsa una casilla en blanco!!1!!11")
                            return
                        }                                
                        //Checamos si alguien ya ganó, HORIZONTALES
                        if ((game[0] == (2) && game[1] == (2) && game[2] == (2)) ||
                            (game[3] == (2) && game[4] == (2) && game[5] == (2)) ||
                            (game[6] == (2) && game[7] == (2) && game[8] == (2)) ||
                            //VERTICALES
                            (game[0] == (2) && game[3] == (2) && game[6] == (2)) ||
                            (game[1] == (2) && game[4] == (2) && game[7] == (2)) ||
                            (game[2] == (2) && game[5] == (2) && game[8] == (2)) ||
                            //DIAGONALES
                            (game[0] == (2) && game[4] == (2) && game[8] == (2)) ||
                            (game[2] == (2) && game[4] == (2) && game[6] == (2))) {
                                current = ""
                                message.reactions.removeAll()
                                for(let i = 0; i<9; i++){                            
                                    if(game[i] == 0) current+="◻️"
                                    if(game[i] == 2) current+="🎉"
                                    if(game[i] == 3) current+="❌"
                                    if((i+1)%3==0) current+="\n"
                                }                                
                                message.reactions.removeAll()
                                message.react('🎊'); 
                                message.react('🎉'); 
                                message.react('🎂'); 
                                client.removeListener('messageReactionAdd',handler) 
                                ended = true
                                return message.edit("Ha ganado <@"+players[0]+">\n<@"+players[0]+"> vs <@"+players[1]+">\n"+current)                    
                        }                        
                        if ((game[0] == (3) && game[1] == (3) && game[2] == (3) )||
                            (game[3] == (3) && game[4] == (3) && game[5] == (3) )||
                            (game[6] == (3) && game[7] == (3) && game[8] == (3) )||
                            //VERTICALES)
                            (game[0] == (3) && game[3] == (3) && game[6] == (3) )||
                            (game[1] == (3) && game[4] == (3) && game[7] == (3) )||
                            (game[2] == (3) && game[5] == (3) && game[8] == (3) )||
                            //DIAGONALES)
                            (game[0] == (3) && game[4] == (3) && game[8] == (3) )||
                            (game[2] == (3) && game[4] == (3) && game[6] == (3))){    
                                current = ""       
                                message.reactions.removeAll()
                                for(let i = 0; i<9; i++){                            
                                    if(game[i] == 0) current+="◻️"
                                    if(game[i] == 2) current+="⭕"
                                    if(game[i] == 3) current+="🎉"
                                    if((i+1)%3==0) current+="\n"
                                }                                                     
                                message.reactions.removeAll()
                                message.react('🎊'); 
                                message.react('🎉'); 
                                message.react('🎂'); 
                                client.removeListener('messageReactionAdd',handler) 
                                ended = true
                                return message.edit("<@"+players[0]+"> vs <@"+players[1]+">\n"+current+"Ha ganado <@"+players[1]+">")                    
                        } 
                        current = ""
                        full = true
                        for(let i = 0; i<9; i++){                            
                            if(game[i] == 0){
                                full = false
                                current+="◻️"
                            } 
                            if(game[i] == 2) current+="⭕"
                            if(game[i] == 3) current+="❌"
                            if((i+1)%3==0) current+="\n"
                        }
                        turn = !turn
                        message.edit("<@"+players[0]+"> vs <@"+players[1]+">\n"+current+"Turno de: <@"+players[turn ? 1 : 0]+">\n")                                            
                        if(full && !ended){
                            message.reactions.removeAll()
                            message.react('🤡')
                            client.removeListener('messageReactionAdd',handler)  
                        }          
                        
                        console.log(game)
                    }                        
                }
                console.log("listening" + players[turn?1 : 0])
            }
            message.react('1️⃣');
            message.react('2️⃣');
            message.react('3️⃣');
            message.react('4️⃣');
            message.react('5️⃣');
            message.react('6️⃣');
            message.react('7️⃣');
            message.react('8️⃣');
            message.react('9️⃣');        
            message.react('❌');
            client.on('messageReactionAdd', handler); 
        })      
                 
    }
}