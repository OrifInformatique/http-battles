// import express
const express = require('express')
// crée un router
const router = express.Router()

const logCtrl = require('../controllers/log')

// importe les fonctionalité d'authorisation moderateur
const modAut = require('../middleware/modAut')



router.get('/log/listLog', modAut, logCtrl.listLogs)

// export le router
module.exports = router