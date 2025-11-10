import axios from "axios";
import { API_URL, getAuthHeader } from "./APIservice";

export const getPending = async (accessCode) => {
  try {
    const response = axios.get(
      `${API_URL}/requests/pending/${accessCode}`,
      getAuthHeader()
    );
    return response;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
