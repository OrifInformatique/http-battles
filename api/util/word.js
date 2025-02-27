const Word = require('../models/Word')

exports.getWord = async (wordId) => {
    return await Word.findOne({ _id: wordId })
}

exports.createWord = async (word) => {
    const newWord = new Word({
        content: word.content,
        position: word.position
    })
    return await newWord.save()
}

exports.revealWord= async (word) =>  {
    await Word.updateOne({ _id: word._id }, {
        $set: {
            revealed: true
        }
    })
    return await this.getWord(word._id)
}
