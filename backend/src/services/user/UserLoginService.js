const { createHashedPassword } = require("../../helpers/utils");
const { getUser } = require("../../models/userModel");
const { generateToken } = require("../../helpers/jwt")

const userLoginService = async (data) => {

    if (!data.email || !data.password) {
        throw new Error("Email and password are required.");
    }

    const pass = createHashedPassword(data.password);

    const user = await getUser({ email: data.email, password: pass });

    if (!user) {
        const userByEmail = await getUser({ email: data.email });
        if (userByEmail) {
            throw new Error("Incorrect password.");
        }

        throw new Error("User not found");
    }

    const token = generateToken({
        _id: user._id,
        email: user.email,
    });

    return {
        id: user._id,
        name: user.name,
        token
    }
}

module.exports = { userLoginService }