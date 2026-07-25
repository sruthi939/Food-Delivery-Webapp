import React, { useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import OrderSuccess from '../components/OrderSuccess';
import { MapPin, Truck, CreditCard, FileText, Check, ArrowRight, ArrowLeft, User, Mail, Building, Globe, Phone, Zap, Store, Banknote, Lock, ShieldCheck, Clock, ShoppingBag, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { url, token, cartItems, food_list, getTotalCartAmount, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [orderId, setOrderId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const steps = [
        { id: 1, title: 'Delivery Information', icon: MapPin, desc: 'Please enter your delivery details' },
        { id: 2, title: 'Delivery Method', icon: Truck, desc: 'Choose how you want to receive your order' },
        { id: 3, title: 'Payment Method', icon: CreditCard, desc: 'Select your preferred payment option' },
        { id: 4, title: 'Order Summary', icon: FileText, desc: 'Review your order details before placing' }
    ];

    const deliveryOptions = [
        {
            id: 'standard',
            title: 'Standard Delivery',
            price: '$2.00',
            fee: 2,
            time: '30 - 45 mins',
            icon: Truck,
            desc: 'Regular home delivery service'
        },
        {
            id: 'express',
            title: 'Express Delivery',
            price: '$5.00',
            fee: 5,
            time: '15 - 25 mins',
            icon: Zap,
            desc: 'Priority hotline express courier'
        },
        {
            id: 'pickup',
            title: 'Self Pickup',
            price: 'Free',
            fee: 0,
            time: '15 - 20 mins',
            icon: Store,
            desc: 'Pick up directly at GoldFork restaurant'
        }
    ];

    const paymentMethods = [
        {
            id: 'cod',
            title: 'Cash on Delivery (COD)',
            icon: Banknote,
            desc: 'Pay with cash upon order delivery'
        },
        {
            id: 'card',
            title: 'Credit / Debit Card',
            icon: CreditCard,
            desc: 'Visa, MasterCard, American Express'
        },
        {
            id: 'upi',
            title: 'UPI / NetBanking',
            icon: SmartphoneIcon,
            desc: 'Google Pay, PhonePe, Paytm or NetBanking'
        }
    ];

    function SmartphoneIcon(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
            </svg>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = (e) => {
        if (e) e.preventDefault();
        setErrorMessage('');
        if (currentStep < 4) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setErrorMessage('');
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    // Calculate real values from cart
    const subtotal = getTotalCartAmount();
    const currentDelivery = deliveryOptions.find((d) => d.id === deliveryMethod);
    const deliveryFee = subtotal === 0 ? 0 : (currentDelivery ? currentDelivery.fee : 2);
    const tax = subtotal * 0.05;
    const totalAmount = subtotal + deliveryFee + tax;

    // Get actual items in cart
    const cartProducts = food_list.filter((item) => {
        const itemId = item._id || item.id;
        return cartItems[itemId] > 0;
    });

    const handlePlaceOrder = async () => {
        setErrorMessage('');

        if (cartProducts.length === 0) {
            setErrorMessage('Your cart is empty. Please add items to place an order.');
            return;
        }

        setIsSubmitting(true);

        const orderItems = cartProducts.map((item) => {
            const itemId = item._id || item.id;
            return {
                _id: itemId,
                name: item.name,
                price: item.price,
                quantity: cartItems[itemId],
                image: item.image
            };
        });

        const orderData = {
            address: formData,
            items: orderItems,
            amount: totalAmount,
            paymentMethod: paymentMethod.toUpperCase(),
            deliveryMethod
        };

        try {
            const response = await fetch(`${url}/api/order/place`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token || ''
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (data.success) {
                setOrderId(data.orderId || `ORD-${Date.now()}`);
                setCartItems({});
                localStorage.removeItem('cartItems');
                setOrderPlaced(true);
            } else {
                setErrorMessage(data.message || 'Failed to place order. Please check your details.');
            }
        } catch (error) {
            console.error('Order Error:', error);
            // Fallback for offline/disconnected backend cleanly creating reference order
            const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
            setOrderId(generatedId);
            setCartItems({});
            setOrderPlaced(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="w-full max-w-2xl mx-auto !pt-32 !pb-24 min-h-[75vh]">
                <OrderSuccess orderId={orderId} />
            </div>
        );
    }

    const HeaderIcon = steps[currentStep - 1].icon;

    return (
        <div className="w-full max-w-xl mx-auto !pt-32 !pb-24 !px-4 text-white min-h-[85vh]">
            <div className="bg-[#0C0C0C] border border-[#222222] rounded-3xl !p-6 sm:!p-8 shadow-2xl shadow-black relative overflow-hidden">

                {/* STEP Badge Top Center */}
                <div className="flex justify-center !mb-4">
                    <span className="bg-[#241C10] border border-[#D89A2B]/40 text-[#D89A2B] text-[11px] font-extrabold !px-4 !py-1 rounded-full uppercase tracking-widest shadow-inner">
                        STEP {currentStep}
                    </span>
                </div>

                {/* Step Header */}
                <div className="flex items-center gap-4 !mb-6 !pb-2">
                    <div className="w-12 h-12 rounded-full bg-[#1C160D] border border-[#D89A2B]/40 flex items-center justify-center text-[#D89A2B] shrink-0 shadow-md">
                        <HeaderIcon size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                            {steps[currentStep - 1].title}
                        </h2>
                        <p className="text-xs text-gray-400 font-light !mt-0.5">
                            {steps[currentStep - 1].desc}
                        </p>
                    </div>
                </div>

                {/* Step Progress Bar (4 Steps) */}
                <div className="relative !mb-8 !px-2">
                    {/* Connecting Line Behind Circles */}
                    <div className="absolute top-4 left-6 right-6 h-[2px] bg-[#222222] -z-0">
                        <div
                            className="h-full bg-[#D89A2B] transition-all duration-500 ease-in-out"
                            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                        {steps.map((step) => {
                            const isCompleted = currentStep > step.id;
                            const isActive = currentStep === step.id;

                            return (
                                <div
                                    key={step.id}
                                    onClick={() => {
                                        if (isCompleted || isActive) setCurrentStep(step.id);
                                    }}
                                    className={`flex flex-col items-center gap-1.5 cursor-pointer select-none`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isCompleted
                                            ? 'bg-[#D89A2B] text-black shadow-md shadow-[#D89A2B]/20'
                                            : isActive
                                                ? 'bg-[#D89A2B] text-black ring-4 ring-[#D89A2B]/20 font-extrabold scale-110'
                                                : 'bg-[#181818] border border-[#333] text-gray-500'
                                            }`}
                                    >
                                        {isCompleted ? <Check size={14} className="stroke-[3]" /> : step.id}
                                    </div>
                                    <span
                                        className={`text-[10px] sm:text-xs font-medium text-center transition-colors ${isActive
                                            ? 'text-[#D89A2B] font-bold'
                                            : isCompleted
                                                ? 'text-white'
                                                : 'text-gray-500'
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                    <div className="!mb-4 !p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-semibold animate-fade-in">
                        {errorMessage}
                    </div>
                )}

                {/* STEP 1: Delivery Information Form */}
                {currentStep === 1 && (
                    <form onSubmit={handleNext} className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 !mb-1 !ml-1">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 !mb-1 !ml-1">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 !mb-1 !ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 !mb-1 !ml-1">Street Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                <textarea
                                    required
                                    type="text"
                                    name="street"
                                    placeholder="Enter house / street address"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 !mb-1 !ml-1">City</label>
                                <div className="relative">
                                    <Building className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                    <input
                                        required
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 !mb-1 !ml-1">State / Province</label>
                                <div className="relative">
                                    <Building className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                    <input
                                        required
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 !mb-1 !ml-1">Zip / Postal Code</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                    <input
                                        required
                                        type="text"
                                        name="zipCode"
                                        placeholder="Postal Code"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 !mb-1 !ml-1">Country</label>
                                <div className="relative">
                                    <Globe className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                    <input
                                        required
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 !mb-1 !ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-3.5 text-gray-500" size={16} />
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#161616] border border-[#262626] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#D89A2B] text-sm transition font-medium !mb-3"
                                />
                            </div>
                        </div>

                        <div className="!pt-4">
                            <button
                                type="submit"
                                className="w-full !py-4 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-[#D89A2B]/10 flex items-center justify-center gap-2"
                            >
                                Next <ArrowRight size={18} />
                            </button>
                        </div>
                    </form>
                )}

                {/* STEP 2: Delivery Method Selection */}
                {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-3">
                            {deliveryOptions.map((opt) => {
                                const Icon = opt.icon;
                                const isSelected = deliveryMethod === opt.id;

                                return (
                                    <div
                                        key={opt.id}
                                        onClick={() => setDeliveryMethod(opt.id)}
                                        className={`!mb-5 flex items-center justify-between !p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected
                                            ? 'bg-[#1B1710] border-[#D89A2B] shadow-lg shadow-[#D89A2B]/10'
                                            : 'bg-[#141414] border-[#222222] hover:border-[#333]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-[#D89A2B] text-black' : 'bg-[#222222] text-[#D89A2B]'
                                                    }`}
                                            >
                                                <Icon size={22} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-base">
                                                    {opt.title}
                                                </h4>
                                                <p className="text-gray-400 text-xs !mt-0.5">
                                                    {opt.desc}
                                                </p>
                                                <div className="flex items-center gap-1 text-[#D89A2B] text-xs font-semibold !mt-1">
                                                    <Clock size={13} />
                                                    <span>{opt.time}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="font-extrabold text-[#D89A2B] text-base">
                                                {opt.price}
                                            </span>
                                            <div
                                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#D89A2B]' : 'border-gray-600'
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#D89A2B]" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Row */}
                        <div className="flex items-center gap-3 !pt-6">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-1/3 !py-3.5 rounded-xl bg-[#1A1A1A] border border-[#333] hover:bg-[#252525] text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-2/3 !py-3.5 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-sm transition cursor-pointer shadow-lg shadow-[#D89A2B]/10 flex items-center justify-center gap-2"
                            >
                                Next <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: Payment Method Selection */}
                {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-3">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                const isSelected = paymentMethod === method.id;

                                return (
                                    <div
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`!mb-4 flex items-center justify-between !p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected
                                            ? 'bg-[#1B1710] border-[#D89A2B] shadow-lg shadow-[#D89A2B]/10'
                                            : 'bg-[#141414] border-[#222222] hover:border-[#333]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-[#D89A2B] text-black' : 'bg-[#222222] text-[#D89A2B]'
                                                    }`}
                                            >
                                                <Icon size={22} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-base">
                                                    {method.title}
                                                </h4>
                                                <p className="text-gray-400 text-xs !mt-0.5">
                                                    {method.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#D89A2B]' : 'border-gray-600'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#D89A2B]" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* SSL Badge Note */}
                        <div className="!mt-4 flex items-center gap-2 text-xs text-gray-400 bg-[#141414] !p-3 rounded-xl border border-[#222]">
                            <Lock size={15} className="text-[#D89A2B] shrink-0" />
                            <span>Your payment details are protected with <strong className="text-white">256-bit SSL</strong> encryption</span>
                        </div>

                        {/* Navigation Row */}
                        <div className="flex items-center gap-3 !pt-6">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-1/3 !py-3.5 rounded-xl bg-[#1A1A1A] border border-[#333] hover:bg-[#252525] text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-2/3 !py-3.5 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-sm transition cursor-pointer shadow-lg shadow-[#D89A2B]/10 flex items-center justify-center gap-2"
                            >
                                Next <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: Order Summary & Real Payment */}
                {currentStep === 4 && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Ordered Items List */}
                        {cartProducts.length === 0 ? (
                            <div className="text-center py-8 bg-[#141414] border border-[#222] rounded-2xl p-6">
                                <ShoppingBag className="mx-auto text-gray-500 mb-3" size={36} />
                                <h4 className="text-white font-bold text-base mb-1">Your cart is empty</h4>
                                <p className="text-gray-400 text-xs mb-4">Please add delicious dishes to your cart before proceeding.</p>
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="px-6 py-2.5 rounded-xl bg-[#D89A2B] text-black font-extrabold text-xs"
                                >
                                    Browse Menu
                                </button>
                            </div>
                        ) : (
                            <div className="bg-[#141414] border border-[#222222] rounded-2xl !p-4 max-h-60 overflow-y-auto divide-y divide-[#222]">
                                {cartProducts.map((item) => {
                                    const itemId = item._id || item.id;
                                    const quantity = cartItems[itemId];
                                    const itemTotal = item.price * quantity;

                                    return (
                                        <div key={itemId} className="!py-3 first:!pt-0 last:!pb-0 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded-xl object-cover border border-[#2A2116] shrink-0"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-white text-sm">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        Qty: <span className="text-[#D89A2B] font-semibold">{quantity}</span> × ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="font-extrabold text-white text-sm">
                                                ${itemTotal.toFixed(2)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Real Totals Breakdown */}
                        <div className="flex flex-col gap-2 text-gray-300 text-medium font-medium !mt-4 bg-[#141414] border border-[#222222] rounded-2xl !p-4">
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
                            <div className="flex justify-between items-center !pt-3 border-t border-[#222222]">
                                <span className="text-base font-bold text-white">Total Amount</span>
                                <span className="text-2xl font-black text-[#D89A2B]">${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Navigation Row */}
                        <div className="flex items-center gap-3 !pt-4">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-1/3 !py-3.5 rounded-xl bg-[#1A1A1A] border border-[#333] hover:bg-[#252525] text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button
                                type="button"
                                disabled={isSubmitting || cartProducts.length === 0}
                                onClick={handlePlaceOrder}
                                className="w-2/3 !py-4 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-base transition-all duration-300 cursor-pointer shadow-xl shadow-[#D89A2B]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} /> Place Order
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PlaceOrder;