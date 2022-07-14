# memer-bot
Bot para Discord que reproduce música (vía [Distube](https://distube.js.org/#/)), permite acceso a juegos que no están disponibles en Discord Activity y algunas otras funciones, para las cuales es necesario registrarse en los siguientes servicios como desarrollador para obtener tokens de APIs:
* [Discord (Para el token del bot)](https://discord.com/developers/applications)
* [MongoDB (Base de datos, obtener String de conexión y nombre de la base de datos)](https://account.mongodb.com/)
* [Spotify for Developers](https://developer.spotify.com/dashboard/)
* [Genius](https://genius.com/api-clients)
* [Giphy](https://developers.giphy.com/dashboard/)
* APIs en RapidAPI
   - [Meme Generator](https://rapidapi.com/meme-generator-api-meme-generator-api-default/api/meme-generator/)
   - [Microsoft Translator](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/)
   - [URL Shortener Service](https://rapidapi.com/BigLobster/api/url-shortener-service/)
   - [Everypixel Image Recognition](https://rapidapi.com/everypixel/api/everypixel-image-recognition/)
   - [Open Weather Map](https://rapidapi.com/community/api/open-weather-map/)
   - [SocialDownloader](https://rapidapi.com/CrashBash/api/socialdownloader/)
   - [Popular Video Downloader](https://rapidapi.com/webcracking/api/popular-video-downloader/)
* APIs abiertas (No requieren registrarse)
   + [Joke](https://v2.jokeapi.dev/)
   + [Chuck Norris](https://api.chucknorris.io/)
   + [Insult](https://evilinsult.com/)
## Comandos
* Música
   + play: Reproduce música desde YouTube, SoundCloud, Facebook, y 700+ sitios (consultar documentación de Distube)
   + playskip: Reproduce la canción y saltea la que se esté reproduciendo
   + autoplay: Continúa la reproducción con videos sugeridos
   + jump: Reproduce la canción de la cola que se indique
   + skip: Saltea la canción
   + search: Busca la canción que indiques y muestra 10 resultados
   + pause: Pausa la canción
   + resume: Reanuda la canción
   + stop: Detiene la reproducción completamente y desconecta al bot
   + sfuffle: Aleatoriza la queue
   + queue: Muestra la queue en páginas
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
> npm i

Una vez instalados los paquetes, configurar el archivo config.json y listo, usar
> node index.js
o
> node .

Puedes mantener tu bot corriendo con ayuda de [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
