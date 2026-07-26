import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    PlusCircle,
    UtensilsCrossed,
    ShoppingBag,
    Users,
    FolderKanban,
    Star,
    MessageSquare,
    Settings,
    LogOut
} from 'lucide-react';

const Sidebar = ({ logout }) => {
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/add', label: 'Add Food Item', icon: PlusCircle },
        { path: '/foods', label: 'Food Menu List', icon: UtensilsCrossed },
        { path: '/orders', label: 'Orders List', icon: ShoppingBag },
        { path: '/users', label: 'User Accounts', icon: Users },
        { path: '/messages', label: 'Messages', icon: MessageSquare },
        { path: '/categories', label: 'Categories', icon: FolderKanban },
        { path: '/reviews', label: 'Customer Reviews', icon: Star },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-[#0D0D0D] border-r border-[#222222] min-h-screen flex flex-col justify-between p-4 shrink-0 select-none">
            <div className="space-y-6">
                {/* Brand Title */}
                <div className="px-4 py-2 border-b border-[#222222]">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        ADMIN PORTAL
                    </span>
                    <h2 className="text-xl font-extrabold text-white font-serif tracking-tight mt-0.5">
                        Gold<span className="text-[#D89A2B]">Fork</span>
                    </h2>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black shadow-lg shadow-[#D89A2B]/20 font-extrabold'
                                            : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Footer */}
            <div className="pt-4 border-t border-[#222222]">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>Logout Admin</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
