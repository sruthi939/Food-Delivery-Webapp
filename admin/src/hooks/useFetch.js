import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios(url, options);
            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Error loading data');
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [fetchData, url]);

    return { data, loading, error, refetch: fetchData };
};
