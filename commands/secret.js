const FormData = require('form-data');

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
                const base64Str = Buffer.from(result).toString("base64");
  
                let decodedBase64 = await base64topdf.base64Decode(base64Str,"download.pdf");
                const fileContent = fs.readFileSync("download.pdf");

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