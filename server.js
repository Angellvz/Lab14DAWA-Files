const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos adjuntos

// Configurar las validaciones de archivos
const fileFilter = (req, file, cb) => {
  // Solo se permiten archivos con extensiones jpg, jpeg, png y gif
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido.'));
  }
};

const fileSizeLimit = 5 * 1024 * 1024; // Tamaño máximo de archivo: 5 MB

const uploadMultiple = upload.array('files', 5); // Máximo 5 archivos

app.post('/upload', (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      const fileDetails = req.files.map((file) => {
        return {
          filename: file.filename,
          originalname: file.originalname,
          size: file.size,
          mimetype: file.mimetype
        };
      });
      res.json({ files: fileDetails });
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
