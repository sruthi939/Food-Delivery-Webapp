import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

import Dashboard from '../pages/Dashboard';
import AddFood from '../pages/AddFood';
import FoodList from '../pages/FoodList';
import EditFood from '../pages/EditFood';
import Orders from '../pages/Orders';
import Users from '../pages/Users';
import Categories from '../pages/Categories';
import Reviews from '../pages/Reviews';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Dashboard />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <AddFood />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/foods"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <FoodList />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <EditFood />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Orders />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Users />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/categories"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Categories />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reviews"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Reviews />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            <Settings />
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
                path="*"
                element={
                    <AdminLayout>
                        <NotFound />
                    </AdminLayout>
                }
            />
        </Routes>
    );
};

export default AdminRoutes;
