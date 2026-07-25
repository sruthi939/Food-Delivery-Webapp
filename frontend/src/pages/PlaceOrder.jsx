import React, { useState } from 'react';
import AddressForm from '../components/AddressForm';
import DeliveryOptions from '../components/DeliveryOptions';
import PaymentMethod from '../components/PaymentMethod';
import OrderSummary from '../components/OrderSummary';
import OrderSuccess from '../components/OrderSuccess';

const PlaceOrder = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod');
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

    const handlePlaceOrder = (e) => {
        if (e) e.preventDefault();
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="w-4/5 mx-auto pt-32 pb-24 min-h-[75vh]">
                <OrderSuccess />
            </div>
        );
    }

    return (
        <div className="w-4/5 mx-auto pt-32 pb-24 text-white min-h-[75vh]">
            {/* Page Header */}
            <div className="mb-10 text-center sm:text-left border-b border-[#222222] pb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Checkout & <span className="text-[#D89A2B]">Payment</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Complete your details below to place your delicious order
                </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Address, Delivery & Payment (7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                    <AddressForm formData={formData} onChange={handleInputChange} />
                    <DeliveryOptions selectedOption={deliveryMethod} onSelect={setDeliveryMethod} />
                    <PaymentMethod selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
                </div>

                {/* Right Side: Order Summary & Place Order Button (5 cols) */}
                <div className="lg:col-span-5 space-y-6 sticky top-28">
                    <OrderSummary />
                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-[#D89A2B]/20 cursor-pointer"
                    >
                        Place Order Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;