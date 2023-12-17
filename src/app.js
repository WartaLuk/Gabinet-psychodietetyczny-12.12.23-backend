const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const db = require('./config/dbConfig');

const app = express();

app.use(bodyParser.json());

// Ustawienie routingów
app.use('/admin', adminRoutes);
app.use('/public', publicRoutes);

// Obsługa błędów
app.use((req, res, next) => {
    res.status(404).send('Nie znaleziono strony');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

module.exports = app;