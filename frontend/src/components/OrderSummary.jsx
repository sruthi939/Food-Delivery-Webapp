import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { ShoppingBag } from 'lucide-react';

const OrderSummary = () => {
    const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + deliveryFee + tax;

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-3xl !p-6 sm:p-8 shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-[#222222] !pb-4 !mb-6 tracking-tight flex items-center gap-2">
                <ShoppingBag className="text-[#D89A2B]" size={24} />
                Order <span className="text-[#D89A2B]">Summary</span>
            </h2>

            {/* Selected Items Thumbnail List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#1F1F1F] !pr-2 !mb-6 scrollbar-thin scrollbar-thumb-[#333]">
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        const quantity = cartItems[item._id];
                        const itemTotal = item.price * quantity;

                        return (
                            <div key={item._id} className="!py-3 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-xl object-cover border border-[#2A2116]"
                                    />
                                    <div>
                                        <h4 className="font-bold text-white text-sm">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            Qty: <span className="text-[#D89A2B] font-semibold">{quantity}</span> × ${item.price}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-bold text-white text-sm">
                                    ${itemTotal.toFixed(2)}
                                </span>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 text-sm border-t border-[#222222] !pt-2">
                <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-white">
                        {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Tax (5%)</span>
                    <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between !pt-3 border-t border-[#222222] text-lg font-extrabold">
                    <span>Total Amount</span>
                    <span className="text-[#D89A2B]">${grandTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;