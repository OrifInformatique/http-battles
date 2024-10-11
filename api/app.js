const express = require('express');
const bodyParser = require('body-parser');

const app = express();    

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

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

/** 
 * Login : Demande de connexion. Demande une adresse e-mail 
 * et envoi un message contenant un lien de connexion 
 **/
app.post('/api/login', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

/** 
 * Login : Vérification de la clé de connexion
 * Si la clé est bonne, créer un token pour l'utilisateur
 **/
app.post('/api/login/verify/:key', (req, res) => {
    res.status(501).json({ message: 'Pas encore implémenté'})
});

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