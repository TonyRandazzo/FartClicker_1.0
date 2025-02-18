const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { extname } = require('path'); // Per ottenere l'estensione del file

const app = express();
const port = 3000;

// Directory per memorizzare le immagini nella cache
const cacheDir = path.join(__dirname, 'imageCache');

// Crea la directory della cache se non esiste
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Endpoint per ottenere un'immagine memorizzata nella cache
app.get('/image/:uri', async (req, res) => {
  const { uri } = req.params;
  const decodedUri = decodeURIComponent(uri);

  // Estrai l'estensione del file originale
  const fileExtension = extname(decodedUri).split('?')[0] || '.png'; // Default PNG se non trovata
  const filename = decodedUri.replace(/\//g, '_').replace(/[^a-zA-Z0-9_]/g, '') + fileExtension;
  const filePath = path.join(cacheDir, filename);

  try {
    // Se l'immagine è già nella cache, inviala come risposta
    if (fs.existsSync(filePath)) {
      console.log(`Immagine trovata nella cache: ${filePath}`);
      return res.sendFile(filePath);
    }

    console.log(`Scaricamento immagine da: ${decodedUri}`);

    // Scarica e salva l'immagine
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

// Avvia il server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
