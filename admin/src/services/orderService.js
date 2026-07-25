import axios from 'axios';

const API_URL = 'http://localhost:4000/api/order';

export const listOrders = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/list`, {
            headers: { token }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch orders';
    }
};

export const updateOrderStatus = async (orderId, status, token) => {
    try {
        const response = await axios.post(`${API_URL}/status`, { orderId, status }, {
            headers: { token }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update order status';
    }
};
