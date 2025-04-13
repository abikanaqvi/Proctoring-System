import axios from "axios";

// Ensure environment variable is set correctly
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const API = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,  // Enable this if using cookies/sessions for authentication
});

// Generic function for API calls
export const commonRequest = async (method, url, data = null) => {
    try {
        const config = {
            method,
            url,
            data, 
            headers: { "Content-Type": "application/json" }
        };

        const response = await API(config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        
        // Return error response instead of throwing, to avoid app crashes
        return error.response?.data || { error: "API request failed" };
    }
};

// Login API call
export const loginUser = async (data) => {
    return await commonRequest("POST", "/api/login", data);
};
