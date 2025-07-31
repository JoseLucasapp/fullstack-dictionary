const { getUser } = require("../../models/userModel")

const UserProfileService = async (query) => {
    const user = await getUser(query);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

module.exports = { UserProfileService }