import axios from "axios";
import { API_URL } from "./APIservice";

export const createGuestSession = async () => {
  try {
    const response = await axios.get(`${API_URL}/guest-session`);
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
