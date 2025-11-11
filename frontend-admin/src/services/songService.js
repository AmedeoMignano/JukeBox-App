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
    throw err.response?.data || err.message;
  }
};
export const createSong = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/songs`,
      payload,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
export const updateSong = async (id, payload) => {
  try {
    const response = await axios.put(
      `${API_URL}/songs/${id}`,
      payload,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
