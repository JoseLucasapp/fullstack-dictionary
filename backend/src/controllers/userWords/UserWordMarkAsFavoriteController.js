const { UserWordGetService } = require("../../services/userWords/UserWordGetService");
const { UserWordMarkAsFavoriteService } = require("../../services/userWords/UserWordMarkAsFavoriteService");

const UserWordMarkAsFavoriteController = async (req, res) => {
    const { word } = req.params;
    const userId = req.user.id;

    try {
        await UserWordMarkAsFavoriteService(word, userId);

        res.status(204).json({})

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordMarkAsFavoriteController }