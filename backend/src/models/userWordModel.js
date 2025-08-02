const mongoose = require("mongoose");

const UserWordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    word: { type: String, required: true },
    favorite: { type: Boolean, default: false },
}, {
    timestamps: true,
});

UserWordSchema.index({ userId: 1, word: 1 }, { unique: true });

const UserWord = mongoose.model("userWords", UserWordSchema);


const UserWorldVisited = async ({ word, userId }) => {
    return await UserWord.findOneAndUpdate(
        { word, userId },
        { word, userId },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );
};

const UserWordFindOne = async (query = {}) => {
    return await UserWord.findOne(query)
}

const UserWordMarkAsFavorite = async (word, userId) => {
    return await UserWord.findOneAndUpdate(
        { word, userId },
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