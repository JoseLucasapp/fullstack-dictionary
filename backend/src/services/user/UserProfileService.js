const { UserGet } = require("../../models/UserModel")

const UserProfileService = async (query) => {
    const user = await UserGet(query);

    if (!user) {
        return new Error("User not found");
    }

    return user;
}

module.exports = { UserProfileService }