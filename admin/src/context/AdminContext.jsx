import React, { createContext, useState, useEffect } from 'react';
import { listFood } from '../services/foodService';
import { listOrders } from '../services/orderService';

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    const url = 'http://localhost:4000';
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    const [foodList, setFoodList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const logout = () => {
        setToken('');
        localStorage.removeItem('adminToken');
    };

    const fetchFoodList = async () => {
        try {
            setLoading(true);
            const res = await listFood();
            if (res.success) {
                setFoodList(res.data);
            }
        } catch (error) {
            console.error('Error fetching food list:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrdersList = async () => {
        if (!token) return;
        try {
            const res = await listOrders(token);
            if (res.success) {
                setOrders(res.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('adminToken', token);
            fetchOrdersList();
        } else {
            localStorage.removeItem('adminToken');
        }
        fetchFoodList();
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
        loading
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};
