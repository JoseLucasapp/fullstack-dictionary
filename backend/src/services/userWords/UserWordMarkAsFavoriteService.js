const { UserWordMarkAsFavorite, UserWordFindOne } = require("../../models/userWordModel");

const UserWordMarkAsFavoriteService = async (id) => {
    const updatedWord = await UserWordMarkAsFavorite(id)

    return updatedWord;
}

module.exports = { UserWordMarkAsFavoriteService }