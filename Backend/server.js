const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { extname } = require('path'); 

const app = express();
const port = 3000;

const cacheDir = path.join(__dirname, 'imageCache');

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

app.get('/image/:uri', async (req, res) => {
  const { uri } = req.params;
  const decodedUri = decodeURIComponent(uri);

  const fileExtension = extname(decodedUri).split('?')[0] || '.png'; 
  const filename = decodedUri.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '') + fileExtension;
  const filePath = path.join(cacheDir, filename);

  try {
    if (fs.existsSync(filePath)) {
      console.log(`Immagine trovata nella cache: ${filePath}`);
      return res.sendFile(filePath);
    }

    console.log(`Scaricamento immagine da: ${decodedUri}`);

    const fileStream = fs.createWriteStream(filePath);
    https.get(decodedUri, (response) => {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          console.log(`Immagine salvata: ${filePath}`);
          res.sendFile(filePath);
        });
      });
    }).on('error', (err) => {
      console.error('Errore durante il download:', err);
      fs.unlink(filePath, () => {
        res.status(500).send('Errore nel download dell\'immagine');
      });
    });
  } catch (error) {
    console.error('Errore generale:', error);
    res.status(500).send('Errore generale');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server avviato su http://0.0.0.0:${port}`);
});
