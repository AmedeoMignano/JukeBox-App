import { getToken } from "./authservice";

export const API_URL = "http://localhost:3001";
export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
