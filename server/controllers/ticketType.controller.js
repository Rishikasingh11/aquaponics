const db = require("../models");
const TicketType = db.ticketType;

// Controller function for an admin or manager to create a ticket
exports.createTicket = (req, res) => {
  const eventId = req.params.eventId;
  const { price, type, userId, couponCode } = req.body;

  // Create a new ticket with or without a coupon code based on the type
  const ticketData = {
    eventId: eventId,
    price: price,
    type: type,
    userId: userId,
    ...(type !== 'original' && { couponCode: couponCode }) // Include couponCode only if type is not 'original'
  };

  TicketType.create(ticketData).then(ticket => {
    // If the ticket is created successfully, return a success message
    res.send({ message: "Ticket was created successfully.", ticket: ticket });
  }).catch(err => {
    // If there is an error, return an error message
    res.status(500).send({ message: err.message });
  });
};


