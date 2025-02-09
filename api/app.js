const express = require('express');

// importe le package Mongoose qui facilittent les interactions avec la base donnée Mongodb
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();    

// importe la page user.js de dossiers routes qui contient les chemins d'accès envers les différnts fonctionnalité utilisateurs
const userRoutes = require('./routes/user')

// connection à la base de donnée mongodb, plus précisément le cluster 0 avec l'utilisateur KenCacciabue
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`)
    // S i tout se passe sans probleme, affiche le succès de la connection dans la console
    .then(() => console.log('Connexion à MongoDB réussie !'))
    // si une erreure est reperer, affiche l'erreur
    .catch( (e)=> console.log(e) )


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
    res.status(200).json({ message : 'HTTP Battle - API'})
});

/** 
 * Base API
 **/
app.get('/api', (req, res) => {
    res.status(200).json({ message : 'HTTP Battle - Version 0.1'})
});

// implement les fonctionalité utilisateurs
app.use('/api/auth', userRoutes)

/** 
 * Games : Crée une nouvelle partie en associant l'utilisateur connecté
 * à un autre utilisateur selon son email.
 **/
app.post('/api/games', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de récupérer les informations de jeux
 **/
app.get('/api/games/:gameId', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de sauvegarder une phrase de 5 mots, 
 * ainsi que la position des 5 mots dans la grille. 
 **/
app.post('/api/games/:gameId/settings', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de rechercher un mot dans la grille 
 * avec la méthode GET.
 **/
app.get('/api/games/:gameId/search/:path', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de rechercher un mot dans la grille 
 * avec la méthode POST.
 **/
app.post('/api/games/:gameId/search/:path', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de rechercher un mot dans la grille 
 * avec la méthode PUT.
 **/
app.put('/api/games/:gameId/search/:path', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de rechercher un mot dans la grille 
 * avec la méthode DELETE.
 **/
app.delete('/api/games/:gameId/search/:path', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Games : Permet de tenter de proposer la phrase secrète de l'adversaire.
 **/
app.post('/api/games/:gameId/try', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

module.exports = app;