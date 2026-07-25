import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { loginAdmin } from '../services/authService';
import { ShieldCheck, Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
    const { setToken } = useContext(AdminContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await loginAdmin(email, password);
            if (res.success && res.token) {
                setToken(res.token);
                navigate('/dashboard');
            } else {
                setError(res.message || 'Invalid credentials');
            }
        } catch (err) {
            setError(err || 'Server connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden text-white">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D89A2B]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md bg-[#0D0D0D] border border-[#222222] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-[#1A1610] border border-[#D89A2B]/40 text-[#D89A2B] flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <ShieldCheck size={28} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        ADMIN PORTAL
                    </span>
                    <h1 className="text-3xl font-extrabold font-serif">
                        Gold<span className="text-[#D89A2B]">Fork</span> Admin
                    </h1>
                    <p className="text-xs text-gray-400 font-light">
                        Enter your administrative credentials to manage store operations.
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center font-semibold">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Admin Email</label>
                        <div className="relative flex items-center">
                            <Mail size={16} className="absolute left-4 text-gray-500" />
                            <input
                                required
                                type="email"
                                placeholder="admin@goldfork.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#D89A2B] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1 ml-1">Password</label>
                        <div className="relative flex items-center">
                            <Lock size={16} className="absolute left-4 text-gray-500" />
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#161616] border border-[#2B2B2B] focus:border-[#D89A2B] rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login to Admin Dashboard'}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
