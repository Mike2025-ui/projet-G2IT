const http = require('http');
const fs = require('fs');
const path = require('path');

// Définir le port du serveur
const PORT = 3000;

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
    console.log(`Requête reçue : ${req.url}`);

    // Résoudre le chemin du fichier demandé
    let filePath = path.join(__dirname, req.url === '/' ? 'vs-groupe-page.html' : req.url);

    // Ajouter une extension .html par défaut si aucune extension n'est spécifiée
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    // Déterminer le type de contenu (MIME type)
    const extname = path.extname(filePath).toLowerCase();
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }

    // Lire et servir le fichier
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Fichier non trouvé
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page non trouvée</h1>', 'utf-8');
            } else {
                // Autre erreur
                res.writeHead(500);
                res.end(`Erreur serveur : ${err.code}`);
            }
        } else {
            // Servir le fichier avec le bon type de contenu
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Démarrer le serveur
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});