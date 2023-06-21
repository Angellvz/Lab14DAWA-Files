const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos adjuntos

app.post('/upload', upload.single('file'), (req, res) => {
    const fileInfo = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    };
    res.send(fileInfo);
  });
  

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
