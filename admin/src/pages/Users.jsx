import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { User, Shield } from 'lucide-react';
import { formatDate } from '../utils/dateFormatter';

const Users = () => {
    const { usersList, loading } = useContext(AdminContext);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = usersList.filter(u =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        USER MANAGEMENT
                    </span>
                    <h1 className="text-2xl font-extrabold font-serif text-white">
                        Customer & Staff Accounts
                    </h1>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by user name, email, role..."
                />
            </div>

            {/* Table */}
            {loading ? (
                <Loader />
            ) : (
                <Table headers={['User', 'Email', 'Role', 'Registered Date']}>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-500 font-light">
                                No registered user accounts found in database.
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map((user) => (
                            <tr key={user._id || user.id} className="hover:bg-[#141414] transition">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#1A1610] border border-[#D89A2B]/40 text-[#D89A2B] flex items-center justify-center font-bold">
                                        <User size={16} />
                                    </div>
                                    <span className="font-bold text-white text-xs">{user.name || 'User'}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-300 text-xs">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                        user.role === 'admin'
                                            ? 'bg-[#D89A2B]/10 text-[#D89A2B] border border-[#D89A2B]/30'
                                            : 'bg-gray-800 text-gray-300 border border-gray-700'
                                    }`}>
                                        {user.role || 'Customer'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-xs">
                                    {formatDate(user.createdAt)}
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            )}
        </div>
    );
};

export default Users;
