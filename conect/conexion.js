const nodemailer = require('nodemailer');

const nodemailerSendgrid = require('nodemailer-sendgrid')

 //transport con  with gmail
const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port : 465,
    secure: true, 
    auth: {
      user: 'alvis.atencio3@gmail.com',
      pass: 'rrfg ovhgtfjz qusc',
    },
  });


/*
// transport con mailtrap
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "92880205b88c71",
      pass: "75dda53727879c"
    }
  }); */


  

// verificar conexion con el servidor

transporter.verify( function(error, success) {
 if(error){
    console.log("error "+error)
 }else{

    console.log("conexion establecida")
 }


} )


/*

//* trasport con sendgrid
const transporter = nodemailer.createTransport(
    nodemailerSendgrid(
        {
            apiKey:'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'
        }
    )

);

*/

console.log(" trasnporte generado")

module.exports = transporter;