import axios from 'axios';
import getTokenFromCookies from './getToken';


// Retrieve the token
const token = getTokenFromCookies();
console.log(token); // Debugging: Log the token to the console

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Only include the Authorization header if the token exists
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
});
export default api