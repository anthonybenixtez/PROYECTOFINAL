// Importar los módulos necesarios
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

// Inicializar la aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'proyectouls2024@gmail.com',  // correo
    pass: 'fonx aviz mlti zzdv',        // contraseña de aplicación
  },
});

// Ruta para manejar el envío de correos
app.post('/send-email', async (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: 'proyectouls2024@gmail.com',  // El correo del destinatario 
    to: email,                          
    subject: 'Nuevo mensaje de contacto', // Asunto del correo
    text: message,                       // Contenido del correo
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ' + info.response);
    res.status(200).send('Correo enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo');
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
