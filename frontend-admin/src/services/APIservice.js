import { getToken } from "./authservice";

export const API_URL = import.meta.env.VITE_API_URL;
export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
