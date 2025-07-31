const { UserWordGetService } = require("../../services/userWords/UserWordGetService");
const { UserWordVisitedService } = require("../../services/userWords/UserWordVisitedService");

const UserWordVisitedController = async (req, res) => {
    const { word } = req.body;
    try {
        const wordExists = await UserWordGetService(word);

        if (!wordExists) {
            await UserWordVisitedService(word);
        }

        res.status(204).json({})

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordVisitedController }