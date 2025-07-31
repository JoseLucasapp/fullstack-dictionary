const { UserWordMarkAsFavoriteService } = require("../../services/userWords/UserWordMarkAsFavoriteService");

const UserWordMarkAsFavoriteController = async (req, res) => {
    try {
        await UserWordMarkAsFavoriteService(req.params.id)

        res.status(204).json({})

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordMarkAsFavoriteController }