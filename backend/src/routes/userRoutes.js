const authMiddleware = require("../middlewares/authMiddleware");

const { UserCreateAccountController } = require("../controllers/user/UserCreateAccountController");
const { UserLoginController } = require("../controllers/user/UserLoginController");
const { UserProfileController } = require("../controllers/user/UserProfileController");
const { UserWordHistoryController } = require("../controllers/userWords/UserWordHistoryController");

module.exports = (app) => {
    app.post("/auth/signup", (req, res) => {
        UserCreateAccountController(req, res);
    });

    app.post("/auth/signin", (req, res) => {
        UserLoginController(req, res);
    });

    app.get("/user/me", authMiddleware, (req, res) => {
        UserProfileController(req, res);
    });

    app.get("/user/me/history", authMiddleware, (req, res) => {
        UserWordHistoryController(req, res);
    });

    app.get("/user/me/favorites", authMiddleware, (req, res) => {
        const newReq = {
            ...req,
            query: {
                ...req.query,
                favorite: "true",
            },
        };

        UserWordHistoryController(newReq, res);
    });

}