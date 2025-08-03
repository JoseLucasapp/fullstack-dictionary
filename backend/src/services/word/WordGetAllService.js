const { decodeCursor, encodeCursor } = require("../../helpers/utils");
const { WordGetAll, WordCountDocuments, WordGetWorld } = require("../../models/WordModel");

const WordGetAllService = async ({ queryData = {}, after, before, limit = 10 }) => {
    const query = {};
    let sort = { _id: 1 };

    if (queryData.search) {
        query.word = { $regex: queryData.search, $options: "i" };
    }

    if (after) {
        query._id = { $gt: decodeCursor(after) };
    } else if (before) {
        query._id = { $lt: decodeCursor(before) };
        sort = { _id: -1 };
    }

    const docs = await WordGetAll(query, limit + 1, sort)

    const hasMore = docs.length > limit;
    if (hasMore) docs.pop();

    const results = (before ? docs.reverse() : docs).map((doc) => ({
        word: doc.word,
        added: doc.createdAt,
    }));

    const totalDocs = await WordCountDocuments(query);

    const firstId = results[0]?._id || docs[0]?._id;
    const lastId = results[results.length - 1]?._id || docs[docs.length - 1]?._id;

    const hasPrev = firstId
        ? await WordGetWorld({ _id: { $lt: firstId } })
        : false;

    const hasNext = lastId
        ? await WordGetWorld({ _id: { $gt: lastId } })
        : false;

    return {
        results,
        totalDocs,
        previous: firstId ? encodeCursor(firstId) : null,
        next: lastId ? encodeCursor(lastId) : null,
        hasNext: !!hasNext,
        hasPrev: !!hasPrev,
    };
}

module.exports = { WordGetAllService };