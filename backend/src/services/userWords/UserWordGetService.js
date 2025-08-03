const { UserWordFindOne } = require("../../models/UserWordModel");

const UserWordGetService = async ({ word, userId }) => {
    return await UserWordFindOne({ word, userId });
};

module.exports = { UserWordGetService };
