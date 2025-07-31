const { createHash } = require("crypto")

const createHashedPassword = (pass) => {
    return createHash("sha256").update(pass).digest("hex");
}

const encodeCursor = (id) => {
    return Buffer.from(JSON.stringify({ _id: id })).toString('base64');
}

const decodeCursor = (cursor) => {
    try {
        const decoded = Buffer.from(cursor, 'base64').toString('utf8');
        return JSON.parse(decoded)._id;
    } catch {
        return null;
    }
}

module.exports = { createHashedPassword, encodeCursor, decodeCursor }