import axios from "axios";
import { API_URL, getAuthHeader } from "./APIservice";

export const getActiveEvent = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/events/active`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`, getAuthHeader());
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/events/${id}`,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const createEvent = async (payload) => {
  try {
    const response = await axios.post(
      `${API_URL}/events`,
      payload,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const updateEvent = async (id, payload) => {
  try {
    const response = await axios.put(
      `${API_URL}/events/${id}`,
      payload,
      getAuthHeader()
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/events/${id}`,
      getAuthHeader()
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};
