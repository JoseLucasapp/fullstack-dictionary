const { UserWorldVisited } = require("../../models/UserWordModel");

const UserWordVisitedService = async (word, userId) => {
    return await UserWorldVisited({ word, userId });
};

module.exports = { UserWordVisitedService };
