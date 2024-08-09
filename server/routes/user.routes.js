const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Change the user role
  app.post(
    "/user/:userId/assign-role/:roleName",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.assignRole
  );
  

  // Get the list of users by email partials

  app.get(
    "/fetch-users-by-email-partials/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.fetchUsersByEmailPartial
  );

  // Get your user dashboard
  app.get(
    "/user/:username/",
    [authJwt.verifyToken, authJwt.isUser, authJwt.isCurrentUser],
    controller.userBoard
  );
  
  // Get your manager dashboard
  app.get(
    "/manager/:username/",
    [authJwt.verifyToken, authJwt.isManager, authJwt.isCurrentUser],
    controller.managerBoard
  );
  
  // Get your admin dashboard
  app.get(
    "/admin/:username/",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isCurrentUser],
    controller.adminBoard
  );
};