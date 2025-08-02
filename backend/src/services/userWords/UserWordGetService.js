const { UserWordFindOne } = require("../../models/userWordModel");

const UserWordGetService = async ({ word, userId }) => {
    return await UserWordFindOne({ word, userId });
};

module.exports = { UserWordGetService };
