module.exports = (sequelize, Sequelize) => {
    const TicketSale = sequelize.define("ticketSales", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ticketId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ticketTypes', 
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
      status: {
        type: Sequelize.STRING, //bought or used
        defaultValue: 'bought'
      }
    });
  
    return TicketSale;
  };