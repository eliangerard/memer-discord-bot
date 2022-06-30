const basicMath = require('advanced-calculator')

module.exports = {
    name: "calculadora",
    aliases: ["calcular","c"],
    run: async (client, message, messi) => {
        if(messi[1] == "help")
            return message.channel.send("Operadores: sin, cos, tan, ln, log, sqrt, '+', '-', '*', '/', '%', '^', max, min, ( )")
        messi.shift()
        expression = ""
        messi.forEach(part => expression+=part)        
        return message.channel.send("Resultado: "+basicMath.evaluate(expression))
    }
}