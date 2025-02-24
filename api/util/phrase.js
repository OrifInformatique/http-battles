const Phrase = require('../models/Phrase')
// import fonctions util pour word
const utilWord = require('../util/word')

exports.createPhrase = async (boardId, userPhrase) => {

    const wordObjectsArray = await exports.fillPhrase(userPhrase)

    const phrase = new Phrase({
            boardId: boardId,
            words: wordObjectsArray
        })
        return await phrase.save()
            .then(console.log("Phrase created  succesfully"))
            .catch(error => console.log(error))
}

exports.fillPhrase = async (userPhrase) => {
    const wordObjectsArray = []
    for(const mot of userPhrase){
            var word = await utilWord.createWord(mot.word)
            wordObjectsArray.push(word)
        }
    return wordObjectsArray
}