import axios from "axios";
const BASE_URL = `http://localhost:8000`
export const api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get("http://localhost:8000/auth/email/refresh_token/", {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                timeout: 1000,
            })
            localStorage.setItem('access_token', response.data.access_token);
            return api.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
})