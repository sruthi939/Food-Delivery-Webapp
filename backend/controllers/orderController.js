import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const inMemoryOrders = [];

// Place User Order
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrderData = {
            userId,
            items,
            amount,
            address,
            status: "Food Processing",
            date: new Date(),
            payment: true
        };

        let newOrder = null;
        try {
            newOrder = new orderModel(newOrderData);
            await newOrder.save();
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
        } catch (dbErr) {
            newOrder = { _id: `order_${Date.now()}`, ...newOrderData };
            inMemoryOrders.push(newOrder);
        }

        res.json({
            success: true,
            message: "Order Placed Successfully",
            orderId: newOrder._id || newOrder.id,
            session_url: "/order"
        });
    } catch (error) {
        console.error("Place Order Error:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// Fetch Logged-in User Orders
export const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        let orders = [];

        try {
            orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
        } catch (dbErr) {
            orders = inMemoryOrders.filter(o => o.userId === userId);
        }

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
};

// List All Orders (Admin Panel)
export const listOrders = async (req, res) => {
    try {
        let orders = [];

        try {
            orders = await orderModel.find({}).sort({ createdAt: -1 });
        } catch (dbErr) {
            orders = inMemoryOrders;
        }

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("List Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching orders list" });
    }
};

// Update Order Status (Admin)
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        try {
            await orderModel.findByIdAndUpdate(orderId, { status });
        } catch (dbErr) {
            const order = inMemoryOrders.find(o => o._id === orderId || o.id === orderId);
            if (order) order.status = status;
        }

        res.json({ success: true, message: "Order Status Updated" });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
};
