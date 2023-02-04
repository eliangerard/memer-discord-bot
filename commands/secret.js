const FormData = require('form-data');
const fs = require('fs');
let jsoner = { json: true };
module.exports = {
    name: "horario",
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
        .then(res => {
            if (res.ok) return res.arrayBuffer();
        })
        .then(buffer => {
            fs.writeFileSync('file.pdf', Buffer.from(buffer));
            message.channel.send({
                files: [{
                    attachment: '/home/ec2-user/memer/file.pdf',
                    name: 'file.pdf'
                }]
            });
        });
        
    }
}