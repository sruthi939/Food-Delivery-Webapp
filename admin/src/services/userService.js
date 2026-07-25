import axios from 'axios';

const API_URL = 'http://localhost:4000/api/users';

export const listUsers = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { token }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch users';
    }
};
