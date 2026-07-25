import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItems from './FoodItems'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div className="w-4/5 mx-auto mt-20 py-12 px-4 sm:px-6 md:px-8 flex flex-col gap-8" id="food-display">
            <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight animate-fade-in-up delay-100">
                Top dishes near you
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItems
                                key={index}
                                index={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    )
}

export default FoodDisplay