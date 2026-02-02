const API_URL = 'http://localhost:3000/api';

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('access_token');

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (response.status === 401 || response.status === 403) {
        // Optional: Auto logout on invalid token
        localStorage.removeItem('access_token');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
};
