const { UserCreate } = require("../../models/userModel")
const { createHashedPassword } = require("../../helpers/utils")

const UserCreateAccountService = async (data) => {
    const hashedPass = createHashedPassword(data.password);
    const user = await UserCreate({ ...data, password: hashedPass });

    return user;
}

module.exports = { UserCreateAccountService }