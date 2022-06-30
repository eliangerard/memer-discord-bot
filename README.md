# memer-bot
Bot para Discord que reproduce música (vía Distube), permite acceso a juegos que no están disponibles en Discord Activity y algunas otras funciones, para las cuales es necesario registrarse en los siguientes servicios como desarrollador para obtener tokens de APIs:
* Discord (Para el token del bot)
* MongoDB (Base de datos, obtener String de conexión y nombre de la base de datos)
* Spotify for Developers
* Genius
* Giphy
* APIs en RapidAPI
   + Meme Generator
   + Microsoft Translator
   + Joke
   + URL Shortener Service
   + Everypixel Image Recognition
   + Open Weather Map
## Comandos
* Música
   + play: Reproduce música desde YouTube, SoundCloud, Facebook, y 700+ sitios (consultar documentación de Distube)
   + autoplay: Continúa la reproducción con videos sugeridos
   + skip: Saltea la canción
   + pause: Pausa la canción
   + resume: Reanuda la canción
   + stop: Detiene la reproducción completamente y desconecta al bot
   + sfuffle: Aleatoriza la queue
   + queue: Muestra la queue (Bug: Si en conjunto tiene más de 1500 caracteres no se mostrará)
   + previous: Reproduce la canción anterior
   + seek: Reproduce la canción desde los segundos indicados
   + volume: Establece el volumen del bot
   + nowplaying: Muestra lo que se está reproduciendo actualmente
   + repeat: Habilita el loop de la canción o de la queue
   + filters: Añade filtros a la reproducción
   + grab: Te envía por privado el link de lo que se esté reproduciendo
* Server
   + setrol: Establece el rol para administrar el bot
   + welcome: Establece el canal de bienvenidas y despedidas
* Misc
   + jugar: Regresa el link del juego indicado para jugar (pueden verse en help)
   + ttt: Tik tak toe, el gato, 3 en raya, o como le digas, pero integrado en mensajes de discord
   + youtube: Regresa el link para youtube together
   + minecraft: Inicializa en el canal al que se enviará el log de tu server de minecraft
   + acortar: Acorta el link que le indiques
   + analizar: Analiza la imagen que le adjuntes y regresa los resultados
   + avatar: Muestra el avatar del usuario que le indiques o de ti mismo
   + calculator: Calcula la operación aritmética que le indiques
   + chiste: Devuelve un chiste en el idioma por defecto que indiques
   + chucknorris: Devuelve una frase de chuck norris (en inglés)
   + clima: Muestra datos del clima sobre la ciudad que indiques
   + crono: Inicia un cronómetro, que puedes tomar vueltas o detener
   + decide: Decide entre opciones, separadas por espacios
   + gif: Envía un gif según lo que indiques
   + halo: Muestra stats de halo infinite o TMCC, según el gamertag indicado
   + insultar: Insulta al usuario que le digas (traduce del inglés, por lo que generalmente no tendrá sentido, nada más insultante que eso)
   + join: Ingresa al bot al canal de voz en el que estés, de ser posible
   + joke: Comando chiste pero en inglés (original)
   + lyrics: Muestra las lyrics de la canción que envíes (nombre, artista), por ahora, solo regresa el link a Genius
   + meme: Haz un meme con múltiples opciones, tiende a no funcionar
   + pizza: Devuelve una pizza generada por IA, de un servicio externo
   + pon: Envía el comando play, funcional para integrarlo con Google Assistant
   + sticker: Envía un sticker, similar a gif
   + talk: Habla (en inglés) con un servicio externo
   + traducir: Traduce al idioma por defecto o a alguno señalado la frase o palabra que se indique


## Instalación
Requerimentos
* Node.js v16
* npm v8
### npm i
Una vez instalados los paquetes, configurar el archivo config.json y listo, usar
### node index.js || node .
Puedes mantener tu bot corriendo con ayuda de PM2
