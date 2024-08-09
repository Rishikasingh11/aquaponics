import api from "../api";

// createEvent function to accept FormData instead of Event
const createEvent = async (formData: FormData) => {
  try {
    // The content-type header is set to 'multipart/form-data' by default when passing FormData to axios
    const response = await api.post("/create-event/", formData);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};

const eventService = {
  createEvent,
};

export default eventService;
