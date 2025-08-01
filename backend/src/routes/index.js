module.exports = (app) => {
    require("./userRoutes")(app);
    require("./wordRoutes")(app);
}