import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

const API = axios.create({baseURL: serverUrl})

export const getProd = (method) => API.get(`/api/${method}`); 
export const getOneProd = (id, method) => API.get(`/api/${method}/${id}`);  