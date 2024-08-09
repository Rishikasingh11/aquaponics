module.exports = (sequelize, Sequelize) => {
  const Manager = sequelize.define("managers", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    eventId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'events',
        key: 'id'
      }
    }
  });

  return Manager;
};