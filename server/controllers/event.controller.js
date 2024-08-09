const { Op } = require("sequelize");
const db = require("../models");
const Event = db.event;
const upload = require('../middleware/multer');

// Create an event
exports.createEvent = [
  upload.single('thumbnail'), // 'thumbnail' is the name of the field in your form
  (req, res) => {
    const {
      name,
      description,
      startingDate,
      endingDate,
      type,
      location,
      slug,
      maxAttendees,
    } = req.body;
    const userId = req.userId;
    // Check all required fields
    if (
      !name ||
      !description ||
      !startingDate ||
      !endingDate ||
      !type ||
      !location ||
      !slug ||
      !maxAttendees ||
      !req.file // Check if file is uploaded
    ) {
      res.status(400).send({
        message: "All fields are required!",
      });
      return;
    }

    // Get the URL of the uploaded file
    const thumbnailUrl = `${req.protocol}://localhost:8080/uploads/${req.file.filename}`;
    // Create an event with thumbnail URL
    Event.create({
      name,
      description,
      startingDate,
      endingDate,
      type,
      location,
      slug,
      maxAttendees,
      userId, // Set the userId to the user's id
      thumbnailUrl: thumbnailUrl, // Save the thumbnail URL in the database
    })
    .then((data) => {
      res.send({ event: data, message: "Event created successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    });
  }
];


exports.fetchEvents = (req, res) => {
  const { type = "all", limit = 10, offset = 0 } = req.query;

  let condition;
  switch (type) {
    case "past":
      condition = { endingDate: { [Op.lt]: new Date() } };
      break;
    case "ongoing":
      condition = {
        startingDate: { [Op.lte]: new Date() },
        endingDate: { [Op.gte]: new Date() },
      };
      break;
    case "upcoming":
      condition = { startingDate: { [Op.gt]: new Date() } };
      break;
    case "all":
    default:
      condition = {};
  }

  Event.findAll({ where: condition, limit, offset })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// fetch an event's details
exports.eventDetails = (req, res) => {
  const slug = req.params.slug;

  Event.findOne({
    where: {
      slug: slug,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "No event found with slug=" + slug,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Event with slug=" + slug,
      });
    });
};

// Update an event
exports.updateEvent = (req, res) => {
  const id = req.params.eventId;

  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Event with id=" + id,
      });
    });
};

// Delete an event
exports.deleteEvent = (req, res) => {
  const id = req.params.eventId;

  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id,
      });
    });
};

// Check slug availability
exports.checkEventSlug = async (req, res) => {
  const slug = req.body.slug;

  try {
    const event = await Event.findOne({
      where: {
        slug: slug,
      },
    });

    if (event) {
      res.status(200).json({ available: false });
    } else {
      res.status(200).json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking the slug.' });
  }
};

// Fetch admin events
exports.fetchAdminEvents = (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const userId = req.userId; // Assuming userId is available in the request

  Event.findAll({
    where: { userId },
    limit,
    offset
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
