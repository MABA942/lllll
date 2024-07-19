const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener los datos de la base de datos
app.get('/data', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'database.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de la base de datos:', err);
            return res.status(500).send('Error al leer el archivo de la base de datos');
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error al analizar el archivo JSON:', parseErr);
            res.status(500).send('Error al analizar el archivo JSON');
        }
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
