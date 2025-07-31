const { UserWordHistoryService } = require("../../services/userWords/UserWordHistory");

const UserWordHistoryController = async (req, res) => {
    const { startWith, hasLetter, favorite, after, before, limit } = req.query;

    try {
        const result = await UserWordHistoryService({
            queryData: { startWith, hasLetter, favorite },
            after,
            before,
            limit: parseInt(limit) || 10,
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordHistoryController }