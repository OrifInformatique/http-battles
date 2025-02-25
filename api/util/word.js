const Word = require('../models/Word')

exports.createWord = async (word) => {
    const newWord = new Word({
        content: word.content,
        position: word.position
    })
    return await newWord.save()
        .then(console.log("Word created  succesfully"))
}
