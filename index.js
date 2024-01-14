const express = require('express');
const bodyParser = require('body-parser'); // Para parsear el cuerpo de las solicitudes POST
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de Multer para la carga de archivos
const storage = multer.memoryStorage(); // Almacenamiento en memoria
const upload = multer({ storage: storage });

// Ruta para cargar una imagen
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    // Acceder a la imagen cargada en req.file.buffer
    const imageBuffer = req.file.buffer;

    // Aquí puedes realizar acciones con la imagen, como enviarla por correo electrónico
    // Puedes utilizar nodemailer para enviar la imagen adjunta por correo electrónico

    res.status(200).json({ message: 'Imagen recibida con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la imagen' });
  }
});

// Ruta de ejemplo para la página principal
app.get('/', (req, res) => {
  res.send('Server Api Carga de imagnes');
});






/// envio de correo
enviarMail = async () => {  
const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port : 587 ,
    auth: {
      user: 'alvis.atencio3@gmail.com',
      pass: 'tu_contraseña',
    },
  });
  
  const mailOptions = {
    from: 'alvis.atencio3@gmail.com',
    to: 'alvis.atencio3@gmail.com',
    subject: 'Prueba de envio',
    text: 'Correo de prueba enviado desde API nodejs',
    
  /*  parte para manejar archivos adjuntados
    attachments: [
      {
        filename: 'imagen_adjunta.jpg',
        path: 'ruta_de_la_imagen_en_el_servidor.jpg',
      },
    ],
*/

  };
  
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });

}


enviarMail();





// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});