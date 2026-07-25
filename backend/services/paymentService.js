import { razorpayInstance } from "../config/razorpay.js";

export const createRazorpayOrder = async (amount, currency = "INR") => {
    const options = {
        amount: Math.round(amount * 100),
        currency,
        receipt: `receipt_${Date.now()}`
    };
    return await razorpayInstance.orders.create(options);
};
