import React from 'react';
import { Package, Clock, CheckCircle2, Truck, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const navigate = useNavigate();

    // Mock Order History Data
    const mockOrders = [
        {
            id: "GF-982145",
            date: "Jul 24, 2026",
            status: "Delivered",
            total: 34.50,
            items: [
                { name: "Classic Burger", qty: 2, price: 8.99 },
                { name: "Butter Noodles", qty: 1, price: 14.00 }
            ]
        },
        {
            id: "GF-981200",
            date: "Jul 20, 2026",
            status: "Delivered",
            total: 28.00,
            items: [
                { name: "Margherita Pizza", qty: 1, price: 12.50 },
                { name: "Chocolate Cake", qty: 2, price: 6.50 }
            ]
        }
    ];

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-3xl !p-6 sm:!p-8 shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-[#222222] !pb-4 !mb-6 tracking-tight flex items-center gap-2">
                <Package className="text-[#D89A2B]" size={24} />
                Order <span className="text-[#D89A2B]">History</span>
            </h2>

            {mockOrders.length === 0 ? (
                <div className="text-center !py-10 text-gray-400">
                    <p>No past orders found.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-[#1A1A1A] border border-[#262626] rounded-2xl !p-5 hover:border-[#D89A2B]/40 transition duration-300"
                        >
                            {/* Header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2A2A] !pb-3 !mb-4">
                                <div>
                                    <span className="font-bold text-white text-base">Order #{order.id}</span>
                                    <p className="text-xs text-gray-400 !mt-0.5">{order.date}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="!px-3 !py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                                        <CheckCircle2 size={13} /> {order.status}
                                    </span>
                                    <span className="font-extrabold text-[#D89A2B] text-base">
                                        ${order.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Items */}
                            <div className="space-y-2 !mb-4 text-xs sm:text-sm text-gray-300">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <span>{item.name} × {item.qty}</span>
                                        <span className="text-gray-400">${(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end border-t border-[#2A2A2A] !pt-3">
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="!px-4 !py-2 rounded-xl bg-[#262626] hover:bg-[#D89A2B] hover:text-black text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                                >
                                    <RefreshCw size={13} /> Reorder
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;