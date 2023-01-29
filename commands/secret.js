const FormData = require('form-data');
const fs = require('fs');
let jsoner = { json: true };
module.exports = {
    name: "boleta",
    run: async (client, message, messi) => {
        if(!messi[1]) return message.channel.send('Ingrese un deste que ya sabes que');
        let formdata = new FormData();
        formdata.append("no_de_control", messi[1]);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://sii.chihuahua2.tecnm.mx/modulos/alu/inscripciones/seleccion_materias/cargaacademica_pdf.php", requestOptions)
            .then(response => {
                let writeStream = fs.createWriteStream('pdf123.pdf')
                writeStream.once('open', (fd) =>{
                    writeStream.write(new Buffer.from(response, 'binary'))
                    writeStream.on('finish', () => {
                    console.log('wrote all data to file');
                    });
                    writeStream.end()
                })
            })
            .catch(error => console.log('error', error));
        }
    }