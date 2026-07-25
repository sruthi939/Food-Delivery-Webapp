import Order from "../models/Order.js";
import User from "../models/User.js";

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;
        const newOrder = new Order({
            userId,
            items,
            amount,
            address,
            paymentMethod: paymentMethod || "COD",
            payment: true
        });
        await newOrder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed Successfully", orderId: newOrder._id });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId || req.body.userId }).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
