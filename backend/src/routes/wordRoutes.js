const authMiddleware = require("../middlewares/authMiddleware");

const { WordGetAllController } = require("../controllers/word/WordGetAllController");
const { WordGetController } = require("../controllers/word/WordGetController");
const { UserWordMarkAsFavoriteController } = require("../controllers/userWords/UserWordMarkAsFavoriteController");
const { UserWordIsFavoriteController } = require("../controllers/userWords/UserWordIsFavoriteController");

module.exports = (app) => {
    app.get("/entries/en", authMiddleware, (req, res) => {
        WordGetAllController(req, res);
    });

    app.get("/entries/en/:word", authMiddleware, (req, res) => {
        WordGetController(req, res);
    });

    app.get("/entries/en/:word/isFavorite", authMiddleware, (req, res) => {
        UserWordIsFavoriteController(req, res);
    });

    app.post("/entries/en/:word/favorite", authMiddleware, (req, res) => {
        UserWordMarkAsFavoriteController(req, res);
    });

    app.post("/entries/en/:word/unfavorite", authMiddleware, (req, res) => {
        UserWordMarkAsFavoriteController(req, res);
    });
}