const { UserCreateAccountService } = require("../../services/user/UserCreateAccountService");
const { userLoginService } = require("../../services/user/userLoginService");
const { UserProfileService } = require("../../services/user/UserProfileService")

const UserCreateAccountController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await UserProfileService({ email: email });
        if (userExists) {
            return res.status(400).json({
                message: "Email already exists."
            })
        }

        await UserCreateAccountService({ name: name, email: email, password: password });

        const userLogin = await userLoginService({ email: email, password: password })

        res.status(200).json(userLogin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserCreateAccountController }