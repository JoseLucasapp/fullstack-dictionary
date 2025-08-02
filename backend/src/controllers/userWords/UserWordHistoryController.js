const { UserWordHistoryService } = require("../../services/userWords/UserWordHistory");

const UserWordHistoryController = async (req, res) => {
    const { search, favorite, after, before, limit } = req.query;
    const userId = req.user.id;

    try {

        const result = await UserWordHistoryService({
            queryData: { search, favorite },
            after,
            before,
            limit: parseInt(limit) || 10,
            userId,
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { UserWordHistoryController }