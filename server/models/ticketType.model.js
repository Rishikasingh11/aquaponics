module.exports = (sequelize, Sequelize) => {
  const TicketType = sequelize.define("ticketTypes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: Sequelize.INTEGER,
      references: {
        model: "events",
        key: "id",
      },
    },
    price: {
      type: Sequelize.FLOAT,
    },
    status: {
      type: Sequelize.STRING, // available or sold out
      defaultValue: "available", // default value is available
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: "original", // default value is 'original'
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    couponCode: {
      type: Sequelize.STRING,
      allowNull: true, // allows null values
      validate: {
        isNullType(value) {
          if (this.type === "original" && value !== null && value !== "") {
            throw new Error("Original type should not have a coupon code");
          }
        },
      },
    },
  });

  return TicketType;
};
