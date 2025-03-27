const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Converti le callback-based functions in Promise-based
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

// Middleware per il parsing del JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/batch-images', async (req, res) => {
  let tempDir;
  try {
    // Verifica che il body contenga un array di URI
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Il body deve contenere un array di URI' });
    }

    const imageUris = req.body;
    const results = [];
    
    // Crea una cartella temporanea per il batch
    tempDir = path.join(__dirname, 'temp_batch_' + Date.now());
    try {
      await mkdir(tempDir, { recursive: true });
    } catch (err) {
      console.error('Errore nella creazione della directory temporanea:', err);
      return res.status(500).json({ error: 'Impossibile creare la directory temporanea' });
    }
    
    // Scarica tutte le immagini in parallelo con limitazione
    const MAX_CONCURRENT_DOWNLOADS = 5; // Limite di download paralleli
    const batches = [];
    for (let i = 0; i < imageUris.length; i += MAX_CONCURRENT_DOWNLOADS) {
      batches.push(imageUris.slice(i, i + MAX_CONCURRENT_DOWNLOADS));
    }

    for (const batch of batches) {
      await Promise.all(batch.map(async (uri) => {
        if (!uri || typeof uri !== 'string') return;
        
        try {
          const filename = encodeURIComponent(uri) + '.img';
          const filePath = path.join(tempDir, filename);
          
          const response = await axios({
            url: uri,
            method: 'GET',
            responseType: 'stream',
            timeout: 10000 // 10 secondi di timeout
          });
          
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);
          
          await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
          });
          
          results.push({ 
            uri, 
            status: 'success',
            localPath: filePath,
            size: fs.statSync(filePath).size
          });
        } catch (error) {
          console.error(`Failed to download image ${uri}:`, error.message);
          results.push({ 
            uri, 
            status: 'failed',
            error: error.message
          });
        }
      }));
    }
    
    // Crea il file risultato
    const resultFile = path.join(tempDir, 'batch_result.json');
    await writeFile(resultFile, JSON.stringify(results, null, 2));
    
    // Imposta gli header per il download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=batch_result.json');
    
    // Invia il file
    const fileStream = fs.createReadStream(resultFile);
    fileStream.pipe(res);
    
    fileStream.on('close', async () => {
      try {
        // Pulisci i file temporanei dopo l'invio
        for (const file of results.filter(r => r.status === 'success')) {
          await unlink(file.localPath).catch(console.error);
        }
        await rmdir(tempDir).catch(console.error);
      } catch (cleanupError) {
        console.error('Errore nella pulizia:', cleanupError);
      }
    });
    
  } catch (error) {
    console.error('Errore nel batch image download:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      details: error.message 
    });
    
    // Tentativo di pulizia in caso di errore
    if (tempDir && fs.existsSync(tempDir)) {
      try {
        const files = await fs.promises.readdir(tempDir);
        await Promise.all(files.map(file => unlink(path.join(tempDir, file)).catch(console.error)));
        await rmdir(tempDir).catch(console.error);
      } catch (cleanupError) {
        console.error('Errore nella pulizia dopo errore:', cleanupError);
      }
    }
  }
});

app.use('/api', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server avviato su http://0.0.0.0:${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
