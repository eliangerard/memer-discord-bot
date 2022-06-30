module.exports = {
    name: "decide",
    aliases: ["cual","random"],
    run: async (client, message, messi) => {
        messi.shift();
        vars = messi.length
        rand = Math.random()        
        acum = 0
        for(let i = 0; i < vars; i++){                        
            if(rand > (acum) && rand < (acum+(1/vars)))
                return message.channel.send(messi[i])
            acum += (1/vars)
        }
    }
}