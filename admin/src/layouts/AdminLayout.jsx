import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { AdminContext } from '../context/AdminContext';

const AdminLayout = ({ children }) => {
    const { logout } = useContext(AdminContext);

    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar Navigation */}
            <Sidebar logout={logout} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar logout={logout} />
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
