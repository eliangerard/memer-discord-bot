var crono;
var vueltaCrono;
var superCrono;
var vuelta = new Array(100);
var vueltas = -1;
var milisegundos = 0;
var cronoStatus = 0;
module.exports = {
    name: "crono",
    run: async (client, message, messi) => {
        if (messi[1] === 'start' || messi[1] === 'iniciar') {
            if (cronoStatus == 0) {
              cronoStatus = 1
              vueltas = -1;
              crono = new Date();
              vueltaCrono = new Date();
              return message.reply('Inicia en ceros jóven');
            }
            if (cronoStatus == 1) {
              return message.reply('Ya hay un cronómetro iniciado');
            }
            if (cronoStatus == 2) {
              crono = new Date();
              crono = new Date(Date.parse(crono) - milisegundos);
              vueltaCrono = new Date(crono);
              return message.reply('Reanudando en: ' + (milisegundos / 1000.0) + ' segundos');
            }
          }
          if (messi[1] === 'pausar') {
            if (cronoStatus == 1) {
              cronoStatus = 2;
              stop = new Date();
              var segundos = ((Date.parse(stop) - Date.parse(crono)) / 1000.0);
              milisegundos = segundos * 1000;
              return message.reply('Tiempo pausado en: ' + segundos + ' segundos');
            }
            else {
              return message.reply('El cronómetro no se ha iniciado aún');
            }
      
          }
          if (messi[1] === 'vuelta') {
            if (cronoStatus === 1) {
              vueltas++;
              superCrono = new Date();
              var stop = new Date();
              var segundos = ((Date.parse(stop) - Date.parse(crono)) / 1000.0);
              vuelta[vueltas] = ((Date.parse(superCrono) - Date.parse(vueltaCrono)) / 1000.0);;
              vueltaCrono = new Date();
              return message.reply('Tiempo de vuelta: ' + vuelta[vueltas] + ' segundos\nTiempo transcurrido: ' + segundos + ' segundos');
            }
            else {
              return message.reply('El cronómetro no se ha iniciado aún');
            }
          }
          if (messi[1] === 'stop' || messi[1] === 'fin') {
            if (cronoStatus != 0) {
              cronoStatus = 0
              var saver = "\n";
              var stop = new Date();
              var segundos = ((Date.parse(stop) - Date.parse(crono)) / 1000.0);
              crono = 0;
              for (var j = 0; j <= vueltas; j++) {
                saver += "Vuelta #" + (j + 1) + ": " + vuelta[j] + " segundos\n";
              }
              if (vueltas >= 0) saver += "Vuelta final: " + ((Date.parse(stop) - Date.parse(vueltaCrono)) / 1000.0) + " segundos\n"
              return message.reply('Tiempo transcurrido: ' + segundos + " segundos" + saver);
            }
            else {
              return message.reply('El cronómetro no se ha iniciado aún');
            }
          }
    }
}