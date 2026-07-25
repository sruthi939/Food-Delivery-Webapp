import React from 'react';

const DashboardCard = ({ title, value, change, icon: Icon, color = '#D89A2B' }) => {
    return (
        <div className="bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 group flex items-center justify-between">
            <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium block">
                    {title}
                </span>
                <h3 className="text-2xl font-black text-white font-serif tracking-tight">
                    {value}
                </h3>
                {change && (
                    <span className="text-[11px] font-bold text-emerald-400 inline-block">
                        {change}
                    </span>
                )}
            </div>

            <div className="w-12 h-12 rounded-2xl bg-[#1A1610] border border-[#D89A2B]/30 text-[#D89A2B] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Icon size={22} />
            </div>
        </div>
    );
};

export default DashboardCard;
