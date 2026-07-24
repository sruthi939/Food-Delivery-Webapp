import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay';
import AppDownload from '../components/AppDownload';

const Home = () => {
    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header />
            <div className='mt-8'>
                <ExploreMenu category={category} setCategory={setCategory} />
            </div>
            <FoodDisplay category={category} />
            <AppDownload />
        </div>
    )
}

export default Home