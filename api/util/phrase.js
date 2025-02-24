const Phrase = require('../models/Phrase')

exports.createPhrase = async (boardId, userPhrase) => {
    const phrase = new Phrase({
            boardId: boardId,
            words: userPhrase
        })
        return await phrase.save()
            .then(console.log("Phrase created  succesfully"))
            .catch(error => console.log(error))
}
