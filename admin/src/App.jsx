import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminRoutes from './routes/AdminRoutes';
import { AdminContext } from './context/AdminContext';

const App = () => {
    const { token } = useContext(AdminContext);

    return (
        <Routes>
            <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/*" element={<AdminRoutes />} />
        </Routes>
    );
};

export default App;
