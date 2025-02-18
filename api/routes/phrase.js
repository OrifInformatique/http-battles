// import express
const express = require('express')
// crée un router
const router = express.Router()
// importe les fonctionalité de partie
const phraseCtrl = require('../controllers/phrase')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

router.post('/phrases/createPhrase', auth, phraseCtrl.createPhrase)

// export le router
module.exports = router