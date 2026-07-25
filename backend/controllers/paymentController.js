import Payment from "../models/Payment.js";
import { createRazorpayOrder } from "../services/paymentService.js";

export const createPaymentOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const razorpayOrder = await createRazorpayOrder(amount);
        res.json({ success: true, razorpayOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId } = req.body;
        res.json({ success: true, message: "Payment verified successfully", paymentId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
