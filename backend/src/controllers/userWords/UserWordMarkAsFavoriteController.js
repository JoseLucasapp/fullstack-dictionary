const { UserWordGetService } = require("../../services/userWords/UserWordGetService");
const { UserWordMarkAsFavoriteService } = require("../../services/userWords/UserWordMarkAsFavoriteService");

const UserWordMarkAsFavoriteController = async (req, res) => {
    try {
        const word = await UserWordGetService(req.params.word);
        await UserWordMarkAsFavoriteService(word._id);

        res.status(204).json({})

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordMarkAsFavoriteController }