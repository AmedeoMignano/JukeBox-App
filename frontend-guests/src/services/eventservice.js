import axios from "axios";
import { API_URL } from "./APIservice";

export const getEventByAccessCode = async (accessCode) => {
  try {
    const response = await axios.get(`${API_URL}/events/event/${accessCode}`);
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
