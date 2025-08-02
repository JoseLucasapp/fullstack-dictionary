const { ApiGetWordService } = require("../../services/integrations/wordApi/ApiGetWordService");
const { UserWordGetService } = require("../../services/userWords/UserWordGetService");
const { UserWordVisitedService } = require("../../services/userWords/UserWordVisitedService");

const WordGetController = async (req, res) => {
    const { word } = req.params;
    const userId = req.user.id;

    try {
        const result = await ApiGetWordService(word);

        const wordExists = await UserWordGetService(word, userId);

        if (!wordExists) {
            await UserWordVisitedService(word, userId);
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { WordGetController }