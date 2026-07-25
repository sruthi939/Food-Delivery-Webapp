import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import DashboardCard from '../components/DashboardCard';
import Table from '../components/Table';
import { DollarSign, ShoppingBag, Utensils, Users, ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { formatDate } from '../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { foodList, orders } = useContext(AdminContext);
    const navigate = useNavigate();

    // Compute metrics
    const totalRevenue = orders.reduce((acc, order) => acc + (order.amount || 0), 0);
    const activeOrders = orders.filter(o => o.status !== 'Delivered').length;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        OVERVIEW
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                        Dashboard Summary
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/add')}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#D89A2B]/20 hover:scale-105 transition cursor-pointer"
                    >
                        + Add New Dish
                    </button>
                </div>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <DashboardCard
                    title="Total Revenue"
                    value={formatPrice(totalRevenue)}
                    change="+18% this month"
                    icon={DollarSign}
                />
                <DashboardCard
                    title="Total Orders"
                    value={orders.length}
                    change={`${activeOrders} Active`}
                    icon={ShoppingBag}
                />
                <DashboardCard
                    title="Menu Dishes"
                    value={foodList.length}
                    change="Live items"
                    icon={Utensils}
                />
                <DashboardCard
                    title="Registered Users"
                    value="128"
                    change="+12 new"
                    icon={Users}
                />
            </div>

            {/* Recent Orders Table Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold font-serif text-white">
                        Recent Customer Orders
                    </h2>
                    <button
                        onClick={() => navigate('/orders')}
                        className="text-xs font-bold text-[#D89A2B] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        View All Orders <ArrowUpRight size={14} />
                    </button>
                </div>

                <Table headers={['Order ID', 'Items', 'Amount', 'Status', 'Date']}>
                    {orders.slice(0, 5).map((order) => (
                        <tr key={order._id} className="hover:bg-[#141414] transition">
                            <td className="px-6 py-4 font-mono text-[#D89A2B] font-bold">
                                #{order._id?.substring(0, 8)}
                            </td>
                            <td className="px-6 py-4">
                                {order.items?.map(i => i.name).join(', ') || 'Food items'}
                            </td>
                            <td className="px-6 py-4 font-bold text-white">
                                {formatPrice(order.amount)}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                    order.status === 'Delivered'
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-[#D89A2B]/10 text-[#D89A2B] border border-[#D89A2B]/30'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-400">
                                {formatDate(order.date)}
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default Dashboard;
