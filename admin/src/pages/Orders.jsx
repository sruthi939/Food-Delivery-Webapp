import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { updateOrderStatus } from '../services/orderService';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { Package, Clock, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { formatDateTime } from '../utils/dateFormatter';

const Orders = () => {
    const { orders, fetchOrdersList, token, loading } = useContext(AdminContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId);
        try {
            const res = await updateOrderStatus(orderId, newStatus, token);
            if (res.success) {
                fetchOrdersList();
            } else {
                alert(res.message || 'Status update failed');
            }
        } catch (error) {
            alert(error || 'Error updating order status');
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredOrders = orders.filter((order) =>
        order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.address?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.address?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        ORDER MANAGEMENT
                    </span>
                    <h1 className="text-2xl font-extrabold font-serif text-white">
                        Customer Orders Oversight
                    </h1>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search by order ID, customer, status..."
                />
            </div>

            {/* Table */}
            {loading ? (
                <Loader />
            ) : (
                <Table headers={['Order ID', 'Customer & Address', 'Items Ordered', 'Total', 'Order Date', 'Update Status']}>
                    {filteredOrders.map((order) => {
                        const address = order.address || {};
                        const customerName = `${address.firstName || 'Guest'} ${address.lastName || ''}`;
                        const fullAddress = `${address.street || ''}, ${address.city || ''}, ${address.state || ''} ${address.zipcode || ''}`;

                        return (
                            <tr key={order._id} className="hover:bg-[#141414] transition">
                                <td className="px-6 py-4 font-mono text-[#D89A2B] font-bold">
                                    #{order._id?.substring(0, 8)}
                                </td>
                                <td className="px-6 py-4 space-y-1">
                                    <h4 className="font-bold text-white text-xs">{customerName}</h4>
                                    <p className="text-[11px] text-gray-400 font-light line-clamp-1">{fullAddress}</p>
                                    <p className="text-[10px] text-gray-500">{address.phone || 'No phone'}</p>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <div className="flex items-center gap-2">
                                        <Package size={14} className="text-[#D89A2B] shrink-0" />
                                        <span className="text-xs text-gray-300 font-medium line-clamp-2">
                                            {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ') || 'Food items'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-extrabold text-[#D89A2B]">
                                    {formatPrice(order.amount)}
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-[11px]">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} className="text-[#D89A2B]" />
                                        <span>{formatDateTime(order.date)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        disabled={updatingId === order._id}
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="bg-[#161616] border border-[#2B2B2B] focus:border-[#D89A2B] text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none transition cursor-pointer"
                                    >
                                        <option value="Food Processing">Food Processing</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        );
                    })}
                </Table>
            )}
        </div>
    );
};

export default Orders;
