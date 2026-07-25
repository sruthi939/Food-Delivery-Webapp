import axios from 'axios';

const API_URL = 'http://localhost:4000/api/food';

export const addFood = async (formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/add`, formData, {
            headers: {
                token: token,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to add food item';
    }
};

export const listFood = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch food list';
    }
};

export const removeFood = async (id, token) => {
    try {
        const response = await axios.post(`${API_URL}/remove`, { id }, {
            headers: { token }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to remove food item';
    }
};

export const updateFood = async (id, formData, token) => {
    try {
        const response = await axios.post(`${API_URL}/update/${id}`, formData, {
            headers: {
                token,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update food item';
    }
};
