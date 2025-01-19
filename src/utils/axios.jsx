import axios from 'axios';
import getTokenFromCookies from './getToken';
import { useNavigate } from 'react-router-dom';

// Retrieve the token
const token = getTokenFromCookies();
console.log(token); // Debugging: Log the token to the console

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://chat-app-backend-gmjh.onrender.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Only include the Authorization header if the token exists
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
});
export default api