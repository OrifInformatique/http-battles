const Phrase = require('../models/Phrase')

exports.createPhrase = async (gameId, userId) => {
    const phrase = new Phrase({
            gameId: gameId,
            userId: userId,
            words: []
        })
        phrase.save()
            .then(console.log("Phrase created  succesfully"))
            .catch(error => console.log(error))
}
