import Razorpay from "razorpay";

export const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_goldfork123",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "razorpay_secret_456"
});
