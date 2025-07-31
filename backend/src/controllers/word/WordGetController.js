const { ApiGetWordService } = require("../../services/integrations/wordApi/ApiGetWordService");

const WordGetController = async (req, res) => {
    const { word } = req.body;

    try {
        const result = await ApiGetWordService(word)

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { WordGetController }