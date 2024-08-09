const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Event Management Routes

  // Create an event
  app.post(
    "/create-event/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createEvent
  );
  // Fetch events based on type: /events?type=past, /events?type=current, /events?type=upcoming
  app.get("/events", controller.fetchEvents);

  // Fetch admin events
  app.get(
    "/fetch-admin-events",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.fetchAdminEvents
  );

  // get details of an event
  app.get("/event/:slug/", controller.eventDetails);

  // Update an event
  app.post(
    "/update-event/:eventId",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.updateEvent
  );

  // Delete an event
  app.post(
    "/delete-event/:eventId",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isEventAdmin],
    controller.deleteEvent
  );

  // Check Event Slug Availability
  app.post(
    "/check-event-slug-availability",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.checkEventSlug
  );
};
