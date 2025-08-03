const { UserCreateAccountService } = require("../../services/user/UserCreateAccountService");
const { UserLoginService } = require("../../services/user/UserLoginService");
const { UserProfileService } = require("../../services/user/UserProfileService")

const UserCreateAccountController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await UserProfileService({ email: email });

        if (userExists.message && userExists.message === "User not found") {
            await UserCreateAccountService({ name: name, email: email, password: password });

            const userLogin = await UserLoginService({ email: email, password: password })

            return res.status(200).json(userLogin);
        }

        res.status(400).json({
            message: "Email already exists."
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserCreateAccountController }