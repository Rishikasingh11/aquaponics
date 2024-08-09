module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      taskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tasks',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING
      }
    });
  
    return Message;
};
