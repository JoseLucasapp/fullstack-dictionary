const { UserDeleteAccountService } = require("../../services/user/UserDeleteAccountService");
const { UserProfileService } = require("../../services/user/UserProfileService")

const UserDeleteController = async (req, res) => {
    try {
        const userExists = await UserProfileService({ _id: req.params.id });
        if (!userExists) {
            return res.status(404).json({
                message: userExists.message
            })
        }

        await UserDeleteAccountService({ _id: req.params.id })

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserDeleteController };