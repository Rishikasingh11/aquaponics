import api from "../api";

interface TicketTypeData {
  id?: number;
  couponCode?: string;
  eventId: number;
  price: number;
  status: string; // 'available' or 'sold out'
  type: string; // default value is 'original'
  userId: number;
}

// Create Ticket
const createTicket = async (ticket: TicketTypeData) => {
  try {
    const response = await api.post(
      `/event/${ticket.eventId}/create-ticket/`,
      ticket
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

// Buy Ticket
// Create Ticket
const buyTicket = async (ticket: TicketTypeData) => {
  try {
    const response = await api.post(
      `/event/${ticket.eventId}/create-ticket/`,
      ticket
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

const ticketService = {
  createTicket,
  buyTicket,
};

export default ticketService;
