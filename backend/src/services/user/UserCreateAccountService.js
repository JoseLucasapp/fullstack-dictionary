
const { createHashedPassword } = require("../../helpers/utils");
const { UserCreate } = require("../../models/userModel");

const UserCreateAccountService = async (data) => {
    const hashedPass = createHashedPassword(data.password);
    const user = await UserCreate({ ...data, password: hashedPass });

    return user;
}

module.exports = { UserCreateAccountService }