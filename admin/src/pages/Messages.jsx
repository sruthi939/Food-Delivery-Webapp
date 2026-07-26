import React, { useState, useContext } from 'react';
import Table from '../components/Table';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import { Mail, User, Clock, Phone, MessageSquare } from 'lucide-react';
import { AdminContext } from '../context/AdminContext';
import { formatDateTime } from '../utils/dateFormatter';

const Messages = () => {
    const { messagesList, loading } = useContext(AdminContext);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMessages = (messagesList || []).filter((msg) =>
        msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        INQUIRIES & FEEDBACK
                    </span>
                    <h1 className="text-2xl font-extrabold font-serif text-white">
                        Customer Contact Messages
                    </h1>
                </div>

                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search messages..."
                />
            </div>

            {filteredMessages.length === 0 ? (
                <div className="bg-[#0D0D0D] border border-[#222222] rounded-3xl p-12 text-center space-y-2">
                    <MessageSquare size={32} className="text-[#D89A2B] mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold text-white">No contact messages received yet.</p>
                    <p className="text-xs text-gray-400 font-light">Messages sent via the Contact Us form will appear here in real-time.</p>
                </div>
            ) : (
                <Table headers={['Customer Name', 'Email & Phone', 'Subject', 'Message Body', 'Submitted Date']}>
                    {filteredMessages.map((msg) => (
                        <tr key={msg._id || Math.random()} className="hover:bg-[#141414] transition">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A1610] border border-[#D89A2B]/40 text-[#D89A2B] flex items-center justify-center font-bold">
                                    <User size={14} />
                                </div>
                                <span className="font-bold text-white text-xs">{msg.name}</span>
                            </td>
                            <td className="px-6 py-4 space-y-0.5 text-xs">
                                <div className="text-gray-300 flex items-center gap-1">
                                    <Mail size={12} className="text-[#D89A2B]" /> {msg.email}
                                </div>
                                {msg.phone && (
                                    <div className="text-gray-500 text-[11px] flex items-center gap-1">
                                        <Phone size={10} /> {msg.phone}
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4 font-bold text-[#D89A2B] text-xs">
                                {msg.subject}
                            </td>
                            <td className="px-6 py-4 text-gray-300 text-xs leading-relaxed max-w-md">
                                "{msg.message}"
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-xs">
                                <div className="flex items-center gap-1">
                                    <Clock size={12} className="text-[#D89A2B]" />
                                    <span>{formatDateTime(msg.createdAt)}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}
        </div>
    );
};

export default Messages;
