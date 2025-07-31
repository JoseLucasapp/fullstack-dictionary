const { verifyToken } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            data: {
                error: {},
                status: "Invalid token",
            },
        });
    }

    try {
        const user = verifyToken(authorization);
        if (!user) {
            return res.status(401).json({
                data: {
                    error: {},
                    status: "Invalid token",
                },
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).send({
            data: err,
            status: "Error"
        })
    }
}