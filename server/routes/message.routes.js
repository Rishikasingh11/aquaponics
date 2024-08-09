const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Send a message in a task thread
  app.post(
    "/task/:taskId/send-message",
    [authJwt.verifyToken, authJwt.isEventAdminOrManager],
    controller.sendMessage
  );

  // Get all messages in a task thread
  app.get(
    "/task/:taskId/messages",
    [authJwt.verifyToken, authJwt.isEventAdminOrManager],
    controller.getMessages
  );
};
