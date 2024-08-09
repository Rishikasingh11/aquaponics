const { authJwt } = require("../middleware");
const controller = require("../controllers/upload.controller");
const uploadMiddleware = require("../middleware/multer");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/upload",
    [authJwt.verifyToken, authJwt.isAdmin, uploadMiddleware.single("myFile")],
    controller.uploadFile
  );
};
