const db = require("../models");
const TicketType = db.ticketType;
const TicketSale = db.ticketSale;
const Event = db.event;

// Controller function for a user to buy a ticket
exports.buyTicket = (req, res) => {
  const eventId = req.params.eventId;
  const couponCode = req.body.couponCode;

  // Define the condition for finding the ticket
  let condition = couponCode ? { eventId: eventId, couponCode: couponCode } : { eventId: eventId, type: 'original' };

  // Find the ticket by its coupon code or type and event ID
  TicketType.findOne({ where: condition }).then((ticket) => {
    if (!ticket || ticket.status !== "available") {
      // If the ticket is not found or not available, return an error
      return res
        .status(404)
        .send({ message: "Ticket type not found or not available." });
    }

    // Find the event by its ID
    Event.findByPk(eventId).then((event) => {
      if (!event) {
        // If the event is not found, return an error
        return res.status(404).send({ message: "Event not found." });
      }

      // Count the number of ticket sales for the event
      TicketSale.count({ where: { ticketId: ticket.id } }).then((count) => {
        if (count >= event.maxAttendees) {
          // If the number of ticket sales is greater than or equal to the maximum number of attendees, return an error
          res.status(400).send({ message: "No more tickets can be sold for this event." });

          // Update the status of the ticket to 'Sold Out'
          TicketType.update({ status: 'Sold Out' }, { where: { id: ticket.id } })
            .then(() => {
              console.log("Ticket status updated to 'Sold Out'");
            })
            .catch((err) => {
              console.error("Error updating ticket status: ", err);
            });
        } else {
          // Create a new ticket sale
          TicketSale.create({
            ticketId: ticket.id,
            userId: req.userId,
            status: "bought",
          })
            .then((ticketSale) => {
              // If the ticket is bought successfully, return a success message
              res.send({
                message: "Ticket was bought successfully.",
                ticketSale: ticketSale,
              });
            })
            .catch((err) => {
              // If there is an error, return an error message
              res.status(500).send({ message: err.message });
            });
        }
      });
    });
  });
};


// Controller function for a user to fetch their own tickets
exports.getUserTickets = (req, res) => {
  const userId = req.params.userId;

  // Find all ticket sales for the user
  TicketSale.findAll({ where: { userId: userId } })
    .then((ticketSales) => {
      // Return the ticket sales
      res.send(ticketSales);
    })
    .catch((err) => {
      // If there is an error, return an error message
      res.status(500).send({ message: err.message });
    });
};
