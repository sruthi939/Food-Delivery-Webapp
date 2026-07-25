import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import Loader from '../components/Loader';
import { Star, User } from 'lucide-react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { formatDate } from '../utils/dateFormatter';

const Reviews = () => {
    const { url } = useContext(AdminContext);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${url}/api/review/list`);
                if (response.data.success) {
                    setReviews(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [url]);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                    FEEDBACK OVERSIGHT
                </span>
                <h1 className="text-2xl font-extrabold font-serif text-white">
                    Customer Reviews & Ratings
                </h1>
            </div>

            {loading ? (
                <Loader />
            ) : reviews.length === 0 ? (
                <div className="bg-[#0D0D0D] border border-[#222222] rounded-3xl p-12 text-center space-y-2">
                    <p className="text-sm font-semibold text-white">No customer reviews submitted yet.</p>
                    <p className="text-xs text-gray-400 font-light">Reviews submitted by logged-in customers will appear here in real-time.</p>
                </div>
            ) : (
                <Table headers={['Customer', 'Rating', 'Review Comment', 'Date']}>
                    {reviews.map((rev) => (
                        <tr key={rev._id} className="hover:bg-[#141414] transition">
                            <td className="px-6 py-4 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1A1610] border border-[#D89A2B]/40 text-[#D89A2B] flex items-center justify-center font-bold">
                                    <User size={14} />
                                </div>
                                <span className="font-bold text-white text-xs">{rev.userName || 'Customer'}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(rev.rating || 5)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-[#D89A2B] text-[#D89A2B]" />
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-300 text-xs leading-relaxed max-w-md">
                                "{rev.comment}"
                            </td>
                            <td className="px-6 py-4 text-gray-400 text-xs">
                                {formatDate(rev.createdAt)}
                            </td>
                        </tr>
                    ))}
                </Table>
            )}
        </div>
    );
};

export default Reviews;
