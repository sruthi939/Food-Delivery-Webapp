import React, { useState } from 'react';
import ExploreMenu from '../components/ExploreMenu';
import FoodDisplay from '../components/FoodDisplay';

const Menu = () => {
    const [category, setCategory] = useState("All");

    return (
        <div className="w-full min-h-screen bg-black text-white !pt-28 !pb-16 animate-fade-in">
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
        </div>
    );
};

export default Menu;