const { WordGetAllService } = require("../../services/word/WordGetAllService");

const WordGetAllController = async (req, res) => {
    const { search, after, before, limit } = req.query;

    try {
        const result = await WordGetAllService({
            queryData: { search },
            after,
            before,
            limit: parseInt(limit) || 10,
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { WordGetAllController }