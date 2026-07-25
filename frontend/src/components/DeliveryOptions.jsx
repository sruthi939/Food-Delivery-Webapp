import React from 'react';
import { Truck, Zap, Store } from 'lucide-react';

const DeliveryOptions = ({ selectedOption, onSelect }) => {
    const options = [
        {
            id: 'standard',
            title: 'Standard Delivery',
            time: '30-45 mins',
            price: '$2.00',
            icon: Truck,
            desc: 'Regular home delivery service'
        },
        {
            id: 'express',
            title: 'Express Delivery',
            time: '15-25 mins',
            price: '$5.00',
            icon: Zap,
            desc: 'Priority hotline express courier'
        },
        {
            id: 'pickup',
            title: 'Self Pickup',
            time: '15-20 mins',
            price: 'Free',
            icon: Store,
            desc: 'Pick up directly at GoldFork restaurant'
        }
    ];

    return (
        <div className="bg-[#111111] border border-[#222222] rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-[#222222] pb-4 mb-6 tracking-tight flex items-center gap-2">
                <Truck className="text-[#D89A2B]" size={24} />
                Delivery <span className="text-[#D89A2B]">Method</span>
            </h2>

            <div className="space-y-3">
                {options.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selectedOption === opt.id;

                    return (
                        <div
                            key={opt.id}
                            onClick={() => onSelect && onSelect(opt.id)}
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
                                        {opt.title}
                                    </h4>
                                    <p className="text-gray-400 text-xs mt-0.5">
                                        {opt.desc} • <span className="text-[#D89A2B]">{opt.time}</span>
                                    </p>
                                </div>
                            </div>

                            <span className="font-bold text-[#D89A2B] text-sm sm:text-base">
                                {opt.price}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DeliveryOptions;