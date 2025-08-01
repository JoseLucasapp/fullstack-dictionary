const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: { type: String, unique: true, required: true }
}, {
    timestamps: true,
});

const Word = mongoose.model("Word", wordSchema);

const WordGetAll = async (query = {}, limit, sort) => {
    return await Word.find(query).sort(sort).limit(limit);
}

const WordGetWorld = async (query = {}) => {
    return await Word.findOne(query)
}

const WordCountDocuments = async (query = {}) => {
    return await Word.countDocuments(query);
}

module.exports = { Word, WordGetAll, WordCountDocuments, WordGetWorld }