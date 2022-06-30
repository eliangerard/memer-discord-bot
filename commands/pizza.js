module.exports = {
    name: "ai",
    run: async (client, message, messi) => {
        var number = Math.random()*3000+"";
        if(messi[1]==='perro')
            message.channel.send('https://boredhumans.b-cdn.net/dogs/'+number.substring(0, number.indexOf('.')) +'.jpg');
        if(messi[1]==='pizza')
            message.channel.send('https://boredhumans.b-cdn.net/pizza/'+number.substring(0, number.indexOf('.')) +'.jpg');
    }
}