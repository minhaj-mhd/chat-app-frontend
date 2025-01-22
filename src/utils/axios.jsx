import axios from 'axios';
import getTokenFromCookies from './getToken';
import { useNavigate } from 'react-router-dom';
import config from '../config';
// Retrieve the token
const token = getTokenFromCookies();

// Create an Axios instance
const api = axios.create({
    baseURL: `${config.apiUrl}/`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        // Only include the Authorization header if the token exists
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
});
export default api