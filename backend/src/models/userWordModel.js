const mongoose = require("mongoose");

const UserWordSchema = new mongoose.Schema({
    word: { type: String, unique: true, required: true },
    favorite: { type: Boolean, default: false }
}, {
    timestamps: true,
});

const UserWord = mongoose.model("userWords", UserWordSchema);

const UserWorldVisited = async (data) => {
    const word = new UserWord(data);
    return await word.save();
}

const UserWordFindOne = async (query = {}) => {
    return await UserWord.findOne(query)
}

const UserWordMarkAsFavorite = async (id) => {
    return await UserWord.findByIdAndUpdate(
        id,
        [{ $set: { favorite: { $not: "$favorite" } } }],
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );
};


const UserWordHistory = async (query = {}, limit, sort) => {
    return await UserWord.find(query).sort(sort).limit(limit);
}

const UserWordDelete = async (id) => {
    await UserWord.delete(id);
}

const UserWordCountDocuments = async (query = {}) => {
    return await UserWord.countDocuments(query);
}

module.exports = { UserWorldVisited, UserWordMarkAsFavorite, UserWordDelete, UserWordHistory, UserWordFindOne, UserWordCountDocuments };