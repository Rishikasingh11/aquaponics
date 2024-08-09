module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("events", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    thumbnailUrl: {
      type: Sequelize.STRING
    },
    startingDate: {
      type: Sequelize.DATE
    },
    endingDate: {
      type: Sequelize.DATE
    },
    type: {
      type: Sequelize.STRING 
    },
    location: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING,
      unique: true
    },
    maxAttendees: {
      type: Sequelize.INTEGER
    },
    userId: { 
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id', 
      }
    }
  });

  return Event;
};
