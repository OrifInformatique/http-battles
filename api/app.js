const express = require('express');

// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, 'env/.env') })

// importe la page user.js de dossiers routes qui contient les chemins d'accès envers les différnts fonctionnalité utilisateurs
const userRoutes = require('./routes/user')

const gameRoutes = require('./routes/game')

const logRoutes = require('./routes/log')


// connection à la base de donnée mongodb, plus précisément le cluster 0 avec l'utilisateur KenCacciabue
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`)
    // S i tout se passe sans probleme, affiche le succès de la connection dans la console
    .then(() => console.log('Connexion à MongoDB réussie !'))
    // si une erreure est reperer, affiche l'erreur
    .catch((e) => console.log(e))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * API root
 **/
app.get('/', (req, res) => {
    res.status(200).json({ message: 'HTTP Battle - API' })
});

/** 
 * Base API
 **/
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'HTTP Battle - Version 0.1' })
});
/**
 * implemente les fonctionalité utilisateurs
 * Routes:
 *  http://localhost:3000/api/user/signup
 *  http://localhost:3000/api/user/login
 *  http://localhost:3000/api/user/findUsers
 * http://localhost:3000/api/user/updateUser
 **/
app.use('/api', userRoutes)

/**
 * Implemente les fonctionalité de parties
 * Routes:
 *  http://localhost:3000/api/games/testAll
 *  http://localhost:3000/api/games/createGame
 *  http://localhost:3000/api/games/findGames
 *  http://localhost:3000/api/games/joinGame
 *  http://localhost:3000/api/games/startGame
 *  http://localhost:3000/api/games/endGame
 *  http://localhost:3000/api/games/tryPhrase
 *  http://localhost:3000/api/games/try(A, B, C, D)
 **/
app.use('/api', gameRoutes)

/**
 * Implemente les fonctionalité de logs
 * Routes:
 *  http://localhost:3000/api/games/listLog
 **/
app.use('/api', logRoutes)

module.exports = app;