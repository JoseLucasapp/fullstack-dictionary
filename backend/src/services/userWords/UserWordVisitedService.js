const { UserWorldVisited } = require("../../models/userWordModel")

const UserWordVisitedService = async (word) => {
    return await UserWorldVisited({ word: word });
}

module.exports = { UserWordVisitedService }