import axios from "axios";
import { API_URL, getAuthHeader } from "./APIservice";

export const createUser = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/register`,
      payload,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
