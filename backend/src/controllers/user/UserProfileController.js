const { UserProfileService } = require("../../services/user/UserProfileService")

const UserProfileController = async (req, res) => {
    try {
        const userProfile = await UserProfileService({ _id: req.params.id });
        if (!userProfile) {
            return res.status(404).json({
                message: userProfile.message
            })
        }

        res.status(200).json(userProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserProfileController }