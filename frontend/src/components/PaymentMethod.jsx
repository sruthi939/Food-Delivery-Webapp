import React from 'react';
import { CreditCard, Banknote, Smartphone, ShieldCheck } from 'lucide-react';

const PaymentMethod = ({ selectedMethod, onSelect }) => {
    const methods = [
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
            icon: Smartphone,
            desc: 'Google Pay, PhonePe, Paytm or NetBanking'
        }
    ];

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-[#222222] pb-4 mb-6 tracking-tight flex items-center gap-2">
                <CreditCard className="text-[#D89A2B]" size={24} />
                Payment <span className="text-[#D89A2B]">Method</span>
            </h2>

            <div className="space-y-3">
                {methods.map((method) => {
                    const Icon = method.icon;
                    const isSelected = selectedMethod === method.id;

                    return (
                        <div
                            key={method.id}
                            onClick={() => onSelect && onSelect(method.id)}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected
                                    ? 'bg-[#1C1A17] border-[#D89A2B] shadow-md shadow-[#D89A2B]/10'
                                    : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#444]'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#D89A2B] text-black' : 'bg-[#262626] text-[#D89A2B]'
                                    }`}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-sm sm:text-base">
                                        {method.title}
                                    </h4>
                                    <p className="text-gray-400 text-xs mt-0.5">
                                        {method.desc}
                                    </p>
                                </div>
                            </div>

                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#D89A2B]' : 'border-gray-500'
                                }`}>
                                {isSelected && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#D89A2B]" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 bg-[#161616] p-3 rounded-xl border border-[#222]">
                <ShieldCheck size={16} className="text-[#D89A2B] shrink-0" />
                <span>Your payment details are protected with SSL encryption</span>
            </div>
        </div>
    );
};

export default PaymentMethod;