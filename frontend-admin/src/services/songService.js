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
export const deleteSong = async (id) => {
  try {
    const payload = { songId: id };
    const response = await axios.delete(`${API_URL}/songs/${id}`, {
      payload,
      ...getAuthHeader(),
    });
    return response;
  } catch (err) {
    err.response?.data || err.message;
  }
};
