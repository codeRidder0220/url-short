const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(endpoint, options = {}) {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        options
    );

    const data = await response.json();

    return {
        response,
        data,
    };
}