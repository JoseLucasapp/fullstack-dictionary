const { UserWordIsFavoriteService } = require("../../services/userWords/UserWordIsFavorite");

const UserWordIsFavoriteController = async (req, res) => {
    const { word } = req.params;
    const userId = req.user.id;

    try {

        const result = await UserWordIsFavoriteService(word, userId);

        res.status(200).json({ result });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordIsFavoriteController }