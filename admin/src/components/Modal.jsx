import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-lg bg-[#0F0D0A] border border-[#D89A2B]/40 rounded-3xl p-6 shadow-2xl space-y-4 relative">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
                    <h3 className="text-base font-bold text-white font-serif">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-[#1C1A17] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
