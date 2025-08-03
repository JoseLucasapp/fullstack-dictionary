const { UserDelete } = require("../../models/userModel");

const UserDeleteAccountService = async (id) => {
    return await UserDelete(id);
}

module.exports = { UserDeleteAccountService }