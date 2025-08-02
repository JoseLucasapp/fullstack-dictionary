const { UserWordMarkAsFavorite, UserWordFindOne } = require("../../models/userWordModel");

const UserWordMarkAsFavoriteService = async (id, userId) => {
    const updatedWord = await UserWordMarkAsFavorite(id, userId)

    return updatedWord;
}

module.exports = { UserWordMarkAsFavoriteService }