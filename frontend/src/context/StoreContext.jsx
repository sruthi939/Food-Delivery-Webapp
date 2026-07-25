import { createContext, useEffect, useState } from "react";
import { food_list as initialFoodList } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState(initialFoodList);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (token) {
            try {
                await fetch(`${url}/api/cart/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token
                    },
                    body: JSON.stringify({ itemId })
                });
            } catch (error) {
                console.error("Error adding to remote cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[itemId] > 0) {
                updated[itemId] -= 1;
                if (updated[itemId] === 0) delete updated[itemId];
            }
            return updated;
        });

        if (token) {
            try {
                await fetch(`${url}/api/cart/remove`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token
                    },
                    body: JSON.stringify({ itemId })
                });
            } catch (error) {
                console.error("Error removing from remote cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item || product.id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await fetch(`${url}/api/food/list`);
            const data = await response.json();
            if (data.success && data.data && data.data.length > 0) {
                setFoodList(data.data);
            }
        } catch (error) {
            console.warn("Could not fetch remote food list, using initial local list fallback.");
        }
    };

    const loadCartData = async (userToken) => {
        try {
            const response = await fetch(`${url}/api/cart/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": userToken
                },
                body: JSON.stringify({})
            });
            const data = await response.json();
            if (data.success && data.cartData) {
                setCartItems(data.cartData);
            }
        } catch (error) {
            console.error("Error loading remote cart data:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken("");
        setCartItems({});
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                const savedToken = localStorage.getItem("token");
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        url,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        logout,
        loadCartData
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;