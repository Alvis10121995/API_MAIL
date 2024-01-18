const express = require('express');
const bodyParser = require('body-parser');

 
const multer  = require('multer'), storage =multer.diskStorage({
   destination : (req, file, cb) =>{
    cb(null, './uploads')
   },
   filename: (req,file,cb)=>{
    cb(null,file.originalname)
   }

})


const upload = multer({storage})

const transporter = require('./conect/conexion')
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());







// Ruta para la carga de imágenes
app.post('/profile', upload.single('imagen'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  const image = req.file;
  console.log(image)
  res.send("imagen cargada")
})






// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});














// Ruta de ejemplo para la página principal
app.get('/', (req, res) => {
  res.send('Server Api Carga de imagnes');
});









// Ruta de ejemplo para la página principal
app.get('/sendcorreo',  async (req, res) => {
  console.log("Test de endpoind")
  
  const mailOptions = {
    from: 'info@examole.com',
    to: 'maydiaz3095@gmail.com',
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
  


  
  try {
 
    // manejo de error
    const info = await transporter.sendMail(mailOptions);
    res.json(info);

  } catch (error) {
     console.log("find error",error)
     res.send("error")
  }

 




  
});




