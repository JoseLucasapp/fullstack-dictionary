const { UserWordGetService } = require("../../services/userWords/UserWordGetService");
const { UserWordVisitedService } = require("../../services/userWords/UserWordVisitedService");

const UserWordVisitedController = async (req, res) => {
    const { word } = req.body;
    const userId = req.user.id;

    try {
        const wordExists = await UserWordGetService({ word, userId });

        if (!wordExists) {
            await UserWordVisitedService(word, userId);
        }

        res.status(204).json({});
    } catch (err) {
        if (err.code === 11000) {
            return res.status(204).json({});
        }

        res.status(400).json({ message: err.message });
    }
};


module.exports = { UserWordVisitedController };
