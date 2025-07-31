const { UserWordFindOne } = require("../../models/userWordModel")

const UserWordGetService = async (word) => {
    return await UserWordFindOne({ word: word });
}

module.exports = { UserWordGetService }