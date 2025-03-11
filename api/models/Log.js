// import mongoose
const mongoose = require('mongoose')

// crée un schema definissant un log
const logSchema = mongoose.Schema({
    // client à l'origine de la requete
    user: { type: Object, required: true },
    // partie concernant la requete
    game: { type: Object, required: false },
    // année de la requete
    year: { type: Number, required: false },
    // mois de la requete
    month: { type: Number, required: false },
    // jour de la requete
    day: { type: Number, required: false },
    // heure de la requete
    hour: { type: Number, required: false },
    // minute de la requete
    minute: { type: Number, required: false },
    // minute de la requete
    data: { type: Object, required: false }
})


module.exports = mongoose.model('Log', logSchema)