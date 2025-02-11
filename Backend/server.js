const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https'); // Usa il modulo https per scaricare le immagini

const app = express();
const port = 3000;

// Directory per memorizzare le immagini nella cache
const cacheDir = path.join(__dirname, 'imageCache');

// Crea la directory della cache se non esiste
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

// Endpoint per ottenere un'immagine memorizzata nella cache
app.get('/image/:uri', async (req, res) => {
  const { uri } = req.params;
  const decodedUri = decodeURIComponent(uri); // Decodifica l'URI
  const filename = decodedUri.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '') + '.img';
  const filePath = path.join(cacheDir, filename);

  try {
    // Se l'immagine è già nella cache, inviala come risposta
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }

    // Altrimenti, scarica l'immagine e salvala nella cache
    const fileStream = fs.createWriteStream(filePath);
    https.get(decodedUri, (response) => {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          res.sendFile(filePath);
        });
      });
    }).on('error', (err) => {
      console.error('Failed to download image:', err);
      fs.unlink(filePath, () => {
        res.status(500).send('Failed to download image');
      });
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});