const { authJwt } = require("../middleware");
const controller = require("../controllers/ticketType.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Route for an admin or manager to create a ticket of various type for a specific event
  app.post(
    "/event/:eventId/create-ticket/",
    [authJwt.verifyToken, authJwt.isManagerOrAdmin],
    controller.createTicket
  );
};
