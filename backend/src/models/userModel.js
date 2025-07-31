const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true,
});

const User = mongoose.model("users", UserSchema);

const UserCreate = async (data) => {
    const user = new User(data);
    return await user.save();
}

const UserGet = async (query = {}) => {
    return await User.findOne(query)
}

const UsersGetAll = async (query = {}) => {
    return await User.find(query);
}

const UserDelete = async (id) => {
    User.deleteOne(id);
}

module.exports = { UserCreate, UserGet, UserDelete, UsersGetAll };