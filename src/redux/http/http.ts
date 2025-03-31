import axios  from "axios";

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/installator-web/api/v1/"
    : `${window.location?.origin}/installator-web/api/v1/`;
 

// eslint-disable-next-line no-unused-vars
export const createAPI = ( ) => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
  });

   
  return api;
};
