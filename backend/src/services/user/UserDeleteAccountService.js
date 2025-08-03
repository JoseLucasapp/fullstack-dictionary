const { UserDelete } = require("../../models/UserModel");

const UserDeleteAccountService = async (id) => {
    return await UserDelete(id);
}

module.exports = { UserDeleteAccountService }