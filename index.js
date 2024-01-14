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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});