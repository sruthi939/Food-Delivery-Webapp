import React, { createContext, useState, useEffect } from 'react';
import { listFood } from '../services/foodService';
import { listOrders } from '../services/orderService';
import { listUsers } from '../services/userService';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    const url = 'http://localhost:4000';
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [foodList, setFoodList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [messagesList, setMessagesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const logout = () => {
        setToken('');
        localStorage.removeItem('adminToken');
    };

    const fetchFoodList = async () => {
        try {
            const res = await listFood();
            if (res.success) {
                setFoodList(res.data);
            }
        } catch (error) {
            console.error('Error fetching food list:', error);
        }
    };

    const fetchOrdersList = async () => {
        try {
            const res = await listOrders(token);
            if (res.success) {
                setOrders(res.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchUsersList = async () => {
        try {
            const res = await listUsers(token);
            if (res.success) {
                setUsersList(res.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchMessagesList = async () => {
        try {
            const res = await axios.get(`${url}/api/contact/list`);
            if (res.data.success) {
                setMessagesList(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Initial fetch and continuous live sync polling (every 4 seconds)
    useEffect(() => {
        let isMounted = true;

        const refreshAllData = async () => {
            if (!isMounted) return;
            await Promise.all([
                fetchFoodList(),
                token ? fetchOrdersList() : null,
                token ? fetchUsersList() : null,
                fetchMessagesList()
            ]);
        };

        refreshAllData();

        // Auto polling timer to sync live activity from Frontend to Admin
        const intervalId = setInterval(() => {
            refreshAllData();
        }, 4000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [token]);

    const contextValue = {
        url,
        token,
        setToken,
        logout,
        foodList,
        fetchFoodList,
        orders,
        fetchOrdersList,
        usersList,
        fetchUsersList,
        messagesList,
        fetchMessagesList,
        loading
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};
