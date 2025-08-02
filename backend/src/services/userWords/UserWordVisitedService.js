const { UserWorldVisited } = require("../../models/userWordModel");

const UserWordVisitedService = async (word, userId) => {
    return await UserWorldVisited({ word, userId });
};

module.exports = { UserWordVisitedService };
