const { UserLoginService } = require("../../services/user/UserLoginService");

const UserLoginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await UserLoginService({ email: email, password: password })

        res.status(200).json(userLogin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserLoginController }