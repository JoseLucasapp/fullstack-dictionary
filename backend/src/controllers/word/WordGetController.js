const { ApiGetWordService } = require("../../services/integrations/wordApi/ApiGetWordService");
const { UserWordGetService } = require("../../services/userWords/UserWordGetService");
const { UserWordVisitedService } = require("../../services/userWords/UserWordVisitedService");

const WordGetController = async (req, res) => {
    const { word } = req.params;

    try {
        const result = await ApiGetWordService(word);

        const wordExists = await UserWordGetService(word);

        if (!wordExists) {
            await UserWordVisitedService(word);
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { WordGetController }