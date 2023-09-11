import axios from "axios";
const BASE_URL = `http://localhost:8000`
export const api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
})

