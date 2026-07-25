import React, { useState, useContext } from 'react';
import AddressForm from '../components/AddressForm';
import DeliveryOptions from '../components/DeliveryOptions';
import PaymentMethod from '../components/PaymentMethod';
import OrderSummary from '../components/OrderSummary';
import OrderSuccess from '../components/OrderSuccess';
import { StoreContext } from '../context/StoreContext';

const PlaceOrder = () => {
    const { url, token, cartItems, food_list, getTotalCartAmount, setCartItems } = useContext(StoreContext);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [orderId, setOrderId] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();

        const orderItems = [];
        food_list.forEach((item) => {
            const itemId = item._id || item.id;
            if (cartItems[itemId] > 0) {
                orderItems.push({
                    ...item,
                    quantity: cartItems[itemId]
                });
            }
        });

        const deliveryFee = deliveryMethod === 'express' ? 5 : deliveryMethod === 'pickup' ? 0 : 2;
        const totalAmount = getTotalCartAmount() + deliveryFee;

        const orderData = {
            address: formData,
            items: orderItems,
            amount: totalAmount,
            paymentMethod
        };

        if (token) {
            try {
                const response = await fetch(`${url}/api/order/place`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    },
                    body: JSON.stringify(orderData)
                });
                const data = await response.json();
                if (data.success) {
                    setOrderId(data.orderId || `ORD-${Date.now()}`);
                    setCartItems({});
                    setOrderPlaced(true);
                } else {
                    setOrderId(`ORD-${Date.now()}`);
                    setOrderPlaced(true);
                }
            } catch (error) {
                console.error("Order error:", error);
                setOrderId(`ORD-${Date.now()}`);
                setOrderPlaced(true);
            }
        } else {
            setOrderId(`ORD-${Date.now()}`);
            setOrderPlaced(true);
        }
    };

    if (orderPlaced) {
        return (
            <div className="w-4/5 mx-auto !pt-32 !pb-24 min-h-[75vh]">
                <OrderSuccess orderId={orderId} />
            </div>
        );
    }

    return (
        <div className="w-4/5 mx-auto !pt-32 !pb-24 text-white min-h-[75vh]">
            {/* Page Header */}
            <div className="!mb-10 text-center sm:text-left border-b border-[#222222] !pb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Checkout & <span className="text-[#D89A2B]">Payment</span>
                </h1>
                <p className="text-gray-400 text-sm !mt-1">
                    Complete your details below to place your delicious order
                </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Address, Delivery & Payment (7 cols) */}
                <div className="lg:col-span-7 !mb-15">
                    <AddressForm formData={formData} onChange={handleInputChange} />
                    <DeliveryOptions selectedOption={deliveryMethod} onSelect={setDeliveryMethod} />
                    <PaymentMethod selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
                </div>

                {/* Right Side: Order Summary & Place Order Button (5 cols) */}
                <div className="lg:col-span-5 space-y-6 sticky top-28">
                    <OrderSummary />
                    <button
                        type="submit"
                        className="w-full !py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-[#D89A2B]/20 cursor-pointer"
                    >
                        Place Order Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;