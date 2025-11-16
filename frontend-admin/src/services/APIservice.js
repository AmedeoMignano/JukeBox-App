import { getToken } from "./authservice";

export const API_URL = "https://rich-sheelagh-amedeomignano-0e8df352.koyeb.app";
export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
