const { decodeCursor, encodeCursor } = require("../../helpers/utils");
const { UserWordHistory, UserWordCountDocuments, UserWordFindOne } = require("../../models/UserWordModel");

const UserWordHistoryService = async ({ queryData = {}, after, before, limit = 10, userId }) => {
    const query = {
        userId
    };
    let sort = { _id: 1 };

    if (queryData.search) {
        query.word = { $regex: queryData.search, $options: "i" };
    }

    if (queryData.favorite) {
        query.favorite = queryData.favorite === 'true';
    }

    if (after) {
        query._id = { $gt: decodeCursor(after) };
    } else if (before) {
        query._id = { $lt: decodeCursor(before) };
        sort = { _id: -1 };
    }

    const docs = await UserWordHistory(query, limit + 1, sort)

    const hasMore = docs.length > limit;
    if (hasMore) docs.pop();

    const results = (before ? docs.reverse() : docs).map((doc) => ({
        word: doc.word,
        added: doc.createdAt,
    }));

    const totalDocs = await UserWordCountDocuments(query);

    const firstId = results[0]?._id || docs[0]?._id;
    const lastId = results[results.length - 1]?._id || docs[docs.length - 1]?._id;

    const hasPrev = firstId
        ? await UserWordFindOne({ _id: { $lt: firstId } })
        : false;

    const hasNext = lastId
        ? await UserWordFindOne({ _id: { $gt: lastId } })
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

module.exports = { UserWordHistoryService };