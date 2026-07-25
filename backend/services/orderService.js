import Order from "../models/Order.js";

export const processNewOrder = async (orderData) => {
    const order = new Order(orderData);
    await order.save();
    return order;
};
