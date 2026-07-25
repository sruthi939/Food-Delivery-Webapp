import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { X } from "lucide-react";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
        useContext(StoreContext);

    return (
        <>
            <div className="max-w-7xl mx-auto mt-28 px-4">

                {/* Heading */}
                <div className="grid grid-cols-6 items-center border-b border-gray-300 pb-4 text-gray-500 font-semibold text-sm md:text-base">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p className="text-center">Remove</p>
                </div>

                {/* Cart Items */}
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className="grid grid-cols-6 items-center gap-4 py-5 border-b border-gray-200">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-xl object-cover"
                                    />

                                    <p className="font-medium text-gray-800">
                                        {item.name}
                                    </p>

                                    <p>${item.price}</p>

                                    <p>{cartItems[item._id]}</p>

                                    <p className="font-semibold text-[#D89A2B]">
                                        ${item.price * cartItems[item._id]}
                                    </p>

                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="rounded-full p-2 transition hover:bg-red-100"
                                        >
                                            <X
                                                size={20}
                                                className="text-gray-500 hover:text-red-500"
                                            />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        );
                    }
                    return null;
                })}

            </div>

            {/* Cart Bottom */}
            <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-8 px-4 lg:flex-row lg:justify-between">

                {/* Cart Totals */}
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

                    <h2 className="mb-6 text-2xl font-bold text-gray-800">
                        Cart Totals
                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between border-b pb-3">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>

                        <div className="flex justify-between border-b pb-3">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>

                        <div className="flex justify-between text-lg font-semibold">
                            <p>Total</p>
                            <p>
                                $
                                {getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 2}
                            </p>
                        </div>

                    </div>

                    <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] py-3 font-semibold text-black transition hover:scale-[1.02]">
                        Proceed to Checkout
                    </button>

                </div>

            </div>
        </>
    );
};

export default Cart;