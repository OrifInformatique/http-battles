// import express
const express = require('express')
// crée un router
const router = express.Router()

const logCtrl = require('../controllers/log')
// importe les fonctionalité d'authorisation utilisateur
const auth = require('../middleware/auth')

router.get('/log/listLog', auth, logCtrl.listLogs)

// export le router
module.exports = router