import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItems from './FoodItems';
import { ChevronDown } from 'lucide-react';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [displayLimit, setDisplayLimit] = useState(8);

    const filteredItems = food_list.filter(
        (item) => category === "All" || category === item.category
    );

    const handleLoadMore = () => {
        setDisplayLimit((prev) => prev + 4);
    };

    return (
        <section className="w-full max-w-7xl mx-auto !px-4 sm:!px-6 md:!px-8 !pb-20" id="food-display">
            {/* Cards Grid (4 columns on desktop matching screenshot) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredItems.slice(0, displayLimit).map((item, index) => {
                    const itemId = item._id || item.id;
                    return (
                        <FoodItems
                            key={itemId}
                            index={index}
                            id={itemId}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            isVeg={item.isVeg !== undefined ? item.isVeg : true}
                        />
                    );
                })}
            </div>

            {/* Load More Button */}
            {displayLimit < filteredItems.length && (
                <div className="flex justify-center !mt-12">
                    <button
                        onClick={handleLoadMore}
                        className="!px-8 !py-3 rounded-xl bg-[#111111] border border-[#D89A2B]/40 text-[#D89A2B] hover:bg-[#1A1A1A] hover:border-[#D89A2B] font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-black"
                    >
                        Load More <ChevronDown size={16} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default FoodDisplay;