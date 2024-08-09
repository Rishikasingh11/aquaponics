const db = require("../models");
const Event = db.event;
const User = db.user;
const Role = db.role;
const EventManager = db.eventManager;

exports.assignManagersToEvent = async (req, res) => {
  const { eventId } = req.params;
  const { users } = req.body; // Expecting an array of user objects with userId

  try {
    // Check if the event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).send({ message: "Event not found!" });
    }

    for (const userObj of users) {
      const userId = userObj.value;

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res
          .status(404)
          .send({ message: `User with ID ${userId} not found!` });
      }

      // Check if the user already has the manager role
      const roles = await user.getRoles();
      const isManager = roles.some((role) => role.name === "manager");
      if (!isManager) {
        // Assign the manager role to the user
        const managerRole = await Role.findOne({ where: { name: "manager" } });
        if (managerRole) {
          await user.addRole(managerRole);
        }
      }

      // Assign the manager to the event using the EventManager model
      await EventManager.create({ userId, eventId });
    }

    res
      .status(200)
      .send({ message: "Managers assigned successfully to the event!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getManagers = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Check if the event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).send({ message: "Event not found!" });
    }

    // Get all managers assigned to the event
    const managers = await event.getManagers();

    // If no managers are assigned to the event
    if (managers.length === 0) {
      return res
        .status(404)
        .send({ message: "No managers assigned to this event!" });
    }

    // Send the list of managers
    res.status(200).send({ managers });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.removeManager = async (req, res) => {
  const { eventId, userId } = req.params;

  try {
    // Check if the manager exists
    const manager = await eventManager.findOne({
      where: { id: userId, eventId: eventId },
    });
    if (!manager) {
      return res
        .status(404)
        .send({ message: "Manager not found in this event!" });
    }

    // Remove the manager from the event
    await manager.destroy();

    res
      .status(200)
      .send({ message: "Manager removed successfully from the event!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
