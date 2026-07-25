import React from 'react';

const Table = ({ headers, children, emptyMessage = 'No data available' }) => {
    return (
        <div className="w-full bg-[#0D0D0D] border border-[#222222] rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead className="bg-[#141414] text-gray-300 font-bold uppercase tracking-wider border-b border-[#222222]">
                        <tr>
                            {headers.map((header, idx) => (
                                <th key={idx} className="px-6 py-4">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1C1C] text-gray-300 font-medium">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
