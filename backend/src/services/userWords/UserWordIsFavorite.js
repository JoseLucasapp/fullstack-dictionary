const { UserWordFindOne } = require("../../models/UserWordModel")

const UserWordIsFavoriteService = async (word, userId) => {
    const wordData = await UserWordFindOne({ word: word, favorite: true, userId });

    return wordData ? true : false;
}

module.exports = { UserWordIsFavoriteService }