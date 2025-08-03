const { UserWordMarkAsFavorite, UserWordFindOne } = require("../../models/UserWordModel");

const UserWordMarkAsFavoriteService = async (id, userId) => {
    const updatedWord = await UserWordMarkAsFavorite(id, userId)

    return updatedWord;
}

module.exports = { UserWordMarkAsFavoriteService }