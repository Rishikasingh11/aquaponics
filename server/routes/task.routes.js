const { authJwt } = require("../middleware");
const controller = require("../controllers/task.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a task for an event
  app.post(
    "/event/:eventId/create-tasks/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.createTasks
  );

  // Update the status of a task
  app.put(
    "/task/:taskId/update-status/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.updateTaskStatus
  );

  // Get all tasks for an event
  app.get(
    "/event/:eventId/tasks/",
    [authJwt.verifyToken, authJwt.isEventAdminOrManager, authJwt.isEventAdminOrManager],
    controller.getTasks
  );
};
