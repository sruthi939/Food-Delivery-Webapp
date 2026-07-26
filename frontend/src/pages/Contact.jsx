import React, { useState, useContext } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChefHat, UtensilsCrossed, Smile, Award, Utensils, MessageSquare, Loader2 } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const Contact = () => {
    const { url } = useContext(StoreContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Please enter your name');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Please enter your email');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (!formData.subject.trim()) {
            toast.error('Please enter a subject');
            return false;
        }
        if (!formData.message.trim()) {
            toast.error('Please enter your message');
            return false;
        }
        if (formData.message.length < 10) {
            toast.error('Message must be at least 10 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const apiUrl = url || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                toast.success(data.message || 'Message saved to database successfully!');
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                toast.error(data.message || 'Failed to submit message to server.');
            }
        } catch (error) {
            console.error('Contact database submit error:', error);
            toast.error('Server connection error. Please ensure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const contactDetails = [
        {
            icon: MapPin,
            title: "Our Location",
            desc: "GoldFork Restaurant, 123 Food Street, Culinary City, FC 56789"
        },
        {
            icon: Phone,
            title: "Phone Number",
            desc: "+1 (555) 123-4567"
        },
        {
            icon: Mail,
            title: "Email Address",
            desc: "contact@goldfork.com"
        },
        {
            icon: Clock,
            title: "Working Hours",
            desc: "Mon - Sun : 10:00 AM - 11:00 PM"
        }
    ];

    const stats = [
        { icon: ChefHat, number: "25+", label: "Expert Chefs" },
        { icon: UtensilsCrossed, number: "500+", label: "Delicious Dishes" },
        { icon: Smile, number: "50K+", label: "Happy Customers" },
        { icon: Award, number: "15+", label: "Awards Won" }
    ];

    return (
        <div className="w-full min-h-screen bg-black text-white pt-32 pb-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">
            
            {/* 1. TOP ROW: Contact Info + Form + Reserved Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column: Get In Touch & Contact Info Cards */}
                <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block mb-1">
                            GET IN TOUCH —
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-serif leading-tight">
                            <span className="font-light text-white">Contact </span>
                            <span className="font-extrabold text-[#D89A2B]">Us</span>
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm font-light mt-3 leading-relaxed">
                            We'd love to hear from you! Whether you have a question, feedback or just want to say hello, feel free to reach out.
                        </p>
                    </div>

                    {/* 4 Info Cards */}
                    <div className="space-y-3 pt-2">
                        {contactDetails.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl p-3.5 flex items-center gap-3.5 transition duration-300 shadow-md group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#1C160D] border border-[#D89A2B]/30 text-[#D89A2B] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-xs">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-400 text-[11px] font-light mt-0.5 leading-snug">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Middle Column: Send Us a Message Form Card */}
                <div className="lg:col-span-4 bg-[#0D0D0D] border border-[#222222] rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                    <div>
                        <div className="text-center mb-6">
                            <h3 className="text-base font-extrabold text-[#D89A2B] font-serif tracking-wide flex items-center justify-center gap-2">
                                <MessageSquare size={18} /> Send Us a Message
                            </h3>
                            <div className="w-12 h-[1px] bg-[#D89A2B]/40 mx-auto mt-2" />
                        </div>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center text-center py-12 space-y-3 animate-fade-in">
                                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h4 className="text-white font-bold text-base">Message Sent!</h4>
                                <p className="text-gray-400 text-xs max-w-xs">
                                    Thank you for reaching out. Your inquiry has been saved to our database.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3.5">
                                <div>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="Your Name *"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition font-medium"
                                    />
                                </div>
                                <div>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Your Email *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition font-medium"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition font-medium"
                                    />
                                </div>
                                <div>
                                    <input
                                        required
                                        type="text"
                                        name="subject"
                                        placeholder="Subject *"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition font-medium"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        required
                                        rows={3}
                                        name="message"
                                        placeholder="Your Message *"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-[#161616] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition font-medium resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs transition-all duration-300 cursor-pointer shadow-lg shadow-[#D89A2B]/20 flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 size={16} className="animate-spin text-black" />
                                    ) : (
                                        <>Send Message <Send size={14} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right Column: Luxury Reserved Dining Table Photo */}
                <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-[#222222] shadow-2xl relative min-h-[360px] group">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                        alt="Reserved Table Luxury Dining"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

            </div>

            {/* 2. BOTTOM ROW: About Us & Story Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#222222]">
                
                {/* Left Dish Photo with SINCE 2018 Gold Badge Overlay */}
                <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-[#222222] shadow-2xl group min-h-[320px]">
                    <img
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                        alt="Fresh Pasta Dish"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Circular Gold Badge Overlay */}
                    <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-[#0E0C09]/95 border border-[#D89A2B] text-center flex flex-col items-center justify-center p-2 text-[#D89A2B] shadow-2xl backdrop-blur-md">
                        <Utensils size={18} className="text-[#D89A2B] mb-0.5" />
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/90">SINCE</span>
                        <span className="text-xl font-extrabold font-serif text-[#D89A2B] leading-none my-0.5">2018</span>
                        <span className="text-[8px] font-medium text-gray-300 text-center leading-tight">
                            Serving Happiness<br />Every Day
                        </span>
                    </div>
                </div>

                {/* Right Text: OUR STORY & About Us + 4 Stats */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        OUR STORY —
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                        About <span className="text-[#D89A2B]">Us</span>
                    </h2>

                    <div className="space-y-3 text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                        <p>
                            At GoldFork, we believe that great food brings people together. Our journey began with a simple vision – to serve delicious, high-quality meals made with the freshest ingredients and a lot of passion.
                        </p>
                        <p>
                            From our kitchen to your table, we are committed to delivering an exceptional dining experience with every order.
                        </p>
                    </div>

                    {/* 4 Stats Grid Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#222222]">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <div key={idx} className="flex flex-col items-start pl-2 first:pl-0 border-l border-[#222222] first:border-l-0">
                                    <div className="w-9 h-9 rounded-full bg-[#1C160D] border border-[#D89A2B]/30 text-[#D89A2B] flex items-center justify-center mb-2">
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-xl font-extrabold text-[#D89A2B] font-serif">
                                        {stat.number}
                                    </span>
                                    <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                                        {stat.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Contact;