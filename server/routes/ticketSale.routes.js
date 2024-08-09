const { authJwt } = require("../middleware");
const controller = require("../controllers/ticketSale.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Route for a user to buy a ticket
  app.post(
    "/ticket/:ticketId/buy/",
    [authJwt.verifyToken, authJwt.isUser],
    controller.buyTicket
  );

  // Route for a user to fetch their own tickets
  app.get(
    "/user/:userId/tickets/",
    [authJwt.verifyToken, authJwt.isCurrentUser],
    controller.getUserTickets
  );
};
