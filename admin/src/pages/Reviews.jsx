import React from 'react';
import Table from '../components/Table';
import { Star, User } from 'lucide-react';

const mockReviews = [
    { id: 1, user: 'Alexander Wright', rating: 5, comment: 'Exceptional food quality and ultrafast delivery! The Alfredo pasta was heavenly.', date: '2026-07-24' },
    { id: 2, name: 'Sophia Chen', rating: 5, comment: 'GoldFork never disappoints. Gorgeous packaging and piping hot Margherita pizza.', date: '2026-07-23' },
    { id: 3, user: 'Marcus Vance', rating: 4, comment: 'Great burgers, juicy patty. Will order again!', date: '2026-07-22' },
    { id: 4, user: 'Elena Rostova', rating: 5, comment: 'Best luxury dining delivery experience. 10/10.', date: '2026-07-20' },
];

const Reviews = () => {
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

            <Table headers={['Customer', 'Rating', 'Review Comment', 'Date']}>
                {mockReviews.map((rev) => (
                    <tr key={rev.id} className="hover:bg-[#141414] transition">
                        <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1A1610] border border-[#D89A2B]/40 text-[#D89A2B] flex items-center justify-center font-bold">
                                <User size={14} />
                            </div>
                            <span className="font-bold text-white text-xs">{rev.user || rev.name}</span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                                {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-[#D89A2B] text-[#D89A2B]" />
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300 text-xs leading-relaxed max-w-md">
                            "{rev.comment}"
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                            {rev.date}
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default Reviews;
