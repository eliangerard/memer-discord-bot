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
            .then(response => response.text())
            .then(async result => {
                console.log(result);
                const pdfString = Buffer.from(result).toString("base64");
  
                fs.writeFile("download.pdf", pdfString, 'base64', function(err) {
                    console.log(err);
                });

                message.channel.send({
                    files: [{
                        attachment: '/home/ec2-user/memer/download.pdf',
                        name: 'download.pdf'
                    }]
                });
            })
            .catch(error => console.log('error', error));
        }
    }