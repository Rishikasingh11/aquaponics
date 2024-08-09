require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: process.env.DB_SSL_REQUIRE === "true",
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === "true", // This is to avoid Node's UNABLE_TO_VERIFY_LEAF_SIGNATURE error
      },
    },
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE),
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.eventManager = require("./eventManager.model.js")(sequelize, Sequelize);
db.message = require("../models/message.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.task = require("../models/task.model.js")(sequelize, Sequelize);
db.ticketType = require("../models/ticketType.model.js")(sequelize, Sequelize);
db.ticketSale = require("../models/ticketSale.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);

// A role can be associated with multiple users through the "user_roles" table
db.role.belongsToMany(db.user, {
  through: "user_roles",
});

// A user can have multiple roles through the "user_roles" table
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

// An event can have multiple tickets associated with it
db.event.hasMany(db.ticketType, { as: "ticketTypes" });

// Each ticket is associated with a specific event
db.ticketType.belongsTo(db.event, {
  foreignKey: "eventId",
  as: "ticketEvent",
});

// A user can create multiple tickets
db.user.hasMany(db.ticketType, { as: "createdTickets" });

// Each ticket is created by a specific user (admin or manager)
db.ticketType.belongsTo(db.user, {
  foreignKey: "userId",
  as: "ticketCreator",
});

// A ticket can have multiple sales associated with it
db.ticketType.hasMany(db.ticketSale, { as: "sales" });

// Each ticket sale is associated with a specific ticket
db.ticketSale.belongsTo(db.ticketType, {
  foreignKey: "ticketId",
  as: "saleTicket",
});

// A user can buy multiple tickets
db.user.hasMany(db.ticketSale, { as: "boughtTickets" });

// Each ticket sale is associated with a specific user (buyer)
db.ticketSale.belongsTo(db.user, {
  foreignKey: "userId",
  as: "ticketBuyer",
});

// A user can create multiple events
db.user.hasMany(db.event, { as: "events" });

// Each event is created by a specific user
db.event.belongsTo(db.user, {
  foreignKey: "userId",
  as: "admin",
});

// An event can have multiple managers associated with it
db.event.hasMany(db.eventManager, { as: "eventManagers" });

// Each manager is associated with a specific event
db.eventManager.belongsTo(db.event, {
  foreignKey: "eventId",
  as: "managerEvent",
});

// A user can be a manager for multiple events
db.user.hasMany(db.eventManager, { as: "userManagers" });

// Each manager is a specific user
db.eventManager.belongsTo(db.user, {
  foreignKey: "userId",
  as: "managerUser",
});

// A task can have multiple messages associated with it
db.task.hasMany(db.message, { as: "messages" });

// Each message is associated with a specific task
db.message.belongsTo(db.task, {
  foreignKey: "taskId",
  as: "messageTask",
});

// A user can send multiple messages
db.user.hasMany(db.message, { as: "messages" });

// Each message is sent by a specific user
db.message.belongsTo(db.user, {
  foreignKey: "userId",
  as: "messageUser",
});

// A user can manage multiple events through the manager table
db.user.belongsToMany(db.event, {
  through: db.eventManager,
  foreignKey: "userId",
  as: "managedEvents",
});

// An event can have multiple users (managers) assigned to it through the manager table
db.event.belongsToMany(db.user, {
  through: db.eventManager,
  foreignKey: "eventId",
  as: "eventAssignedManagers",
});

// Define the available roles
db.ROLES = ["user", "manager", "admin"];

const Role = db.role;

module.exports = db;
