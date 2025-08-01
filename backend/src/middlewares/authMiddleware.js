const { verifyToken } = require('../helpers/jwt');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token ausente ou mal formatado",
        });
    }

    try {
        const token = authorization.split(" ")[1];
        const user = verifyToken(token);

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Token inválido ou expirado",
        });
    }
};
