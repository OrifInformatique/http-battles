/**
 * Role:    Route pour les fonctionnalité des utilisateurs
 * Date:    06.06.2025
 * 
 */


// import express
const express = require('express')
// crée un router
const router = express.Router()

// importe les endpoints utilisateur
const userCtrl = require('../controllers/user')

// importe les middleware utilisateur
const middleUser = require('../middleware/user')

const check = require('../middleware/check')

// importe les fonctionalité d'authorisation moderateur
const modAut = require('../middleware/modAut')

// importe les fonctionalité d'authorisation moderateur
const auth = require('../middleware/auth')


/**
 * redirige la requette post de création utilisateur
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "email": "",        // email du nouvel utilisateur
 *      "password": "",     // password du nouvel utilisateur
 *      "firstName": "",    // prenom du nouvel utilisateur
 *      "lastname": "",     // nom du nouvel utilisateur
 *      "username": ""      // username du nouvel utilisateur
 *  }
 * 
 * */ 
router.post('/user/signup', check.dataInit, middleUser.signup, check.logInit, check.dataValidity, userCtrl.signup)

/**
 * redirige la requet post de connexion utilisateur
 * 
 * forme de la requette :
 *  {
 *      "userId": "",       // id du client
 *      "email": "",        // email de l'utilisateur
 *      "password": ""      // password de l'utilisateur
 *  }
 * 
 * */ 
router.post('/user/login', check.dataInit, middleUser.login, check.logInit, check.dataValidity, userCtrl.login)

// retourne une liste des profils utilisateurs
router.get('/user/findUsers', modAut, check.dataInit, middleUser.findUser, check.logInit, check.dataValidity, userCtrl.findUser)

// retourne une liste des profils utilisateurs
router.put('/user/updateUser', auth, check.dataInit, middleUser.updateUser, check.logInit, check.dataValidity, userCtrl.updateUser)

// export le router
module.exports = router