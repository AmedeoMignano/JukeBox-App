import axios from "axios";
import { API_URL, getAuthHeader } from "./APIservice";

export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${API_URL}/songs`, getAuthHeader());
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
